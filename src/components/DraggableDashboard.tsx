'use client';

import { useState, useEffect, useCallback, useRef, ReactNode, Children, isValidElement } from 'react';
import { GripVertical, RotateCcw } from 'lucide-react';
import { type Theme } from '@/lib/themes';

/* ─── Marker component for each reorderable section ─── */
interface DashletSectionProps {
  id: string;
  label?: string;
  children: ReactNode;
}

export function DashletSection({ children }: DashletSectionProps) {
  return <>{children}</>;
}

/* ─── Main wrapper — reorders DashletSection children via drag-and-drop ─── */
interface DraggableDashboardProps {
  dashboardId: string;
  userId?: string;
  theme: Theme;
  children: ReactNode;
  className?: string;
}

export function DraggableDashboard({
  dashboardId,
  userId,
  theme,
  children,
  className = 'space-y-4',
}: DraggableDashboardProps) {
  const allChildren = Children.toArray(children);

  // Separate: non-DashletSection (static, rendered first) vs DashletSection (reorderable)
  const staticChildren: React.ReactNode[] = [];
  const sections: { id: string; label: string; el: React.ReactElement }[] = [];

  allChildren.forEach((child) => {
    if (isValidElement(child) && child.type === DashletSection) {
      const p = child.props as DashletSectionProps;
      sections.push({ id: p.id, label: p.label || p.id, el: child });
    } else {
      staticChildren.push(child);
    }
  });

  const defaultOrder = sections.map((s) => s.id);
  const defaultRef = useRef(defaultOrder);
  defaultRef.current = defaultOrder;

  const storageKey = `dashlet-order-${userId || 'anon'}-${dashboardId}`;
  const [order, setOrder] = useState<string[]>(defaultOrder);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Load saved order on mount
  useEffect(() => {
    setReady(true);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved: string[] = JSON.parse(raw);
        const ids = new Set(defaultRef.current);
        const valid = saved.filter((id) => ids.has(id));
        const added = defaultRef.current.filter((id) => !saved.includes(id));
        if (valid.length + added.length === defaultRef.current.length) {
          setOrder([...valid, ...added]);
        }
      }
    } catch { /* ignore corrupt localStorage */ }
  }, [storageKey]);

  const persist = useCallback(
    (o: string[]) => {
      setOrder(o);
      try { localStorage.setItem(storageKey, JSON.stringify(o)); } catch { /* */ }
    },
    [storageKey],
  );

  const reset = useCallback(() => {
    setOrder(defaultRef.current);
    try { localStorage.removeItem(storageKey); } catch { /* */ }
  }, [storageKey]);

  const customized = ready && JSON.stringify(order) !== JSON.stringify(defaultOrder);

  /* ─── Drag handlers ─── */
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setTimeout(() => setDragId(id), 0);
  };
  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragId && dragId !== id) setOverId(id);
  };
  const onDragLeave = () => setOverId(null);
  const onDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const next = [...order];
    const fi = next.indexOf(dragId);
    const ti = next.indexOf(targetId);
    next.splice(fi, 1);
    next.splice(ti, 0, dragId);
    persist(next);
    setDragId(null);
    setOverId(null);
  };
  const onDragEnd = () => { setDragId(null); setOverId(null); };

  // Build map for ordered rendering
  const sectionMap = new Map(sections.map((s) => [s.id, s]));
  const ordered = order.map((id) => sectionMap.get(id)).filter(Boolean) as typeof sections;

  return (
    <div className={className}>
      {/* Static children (headers, view switches, etc.) */}
      {staticChildren}

      {/* Reset layout — only visible when user has customized order */}
      {customized && (
        <div className="flex justify-end -mt-1">
          <button
            onClick={reset}
            className={`flex items-center gap-1 text-[11px] ${theme.iconColor || 'text-gray-400'} hover:opacity-100 opacity-50 transition-opacity px-2 py-0.5 rounded`}
          >
            <RotateCcw size={10} /> Reset layout
          </button>
        </div>
      )}

      {/* Reorderable sections */}
      {ordered.map(({ id, label, el }) => (
        <div
          key={id}
          draggable
          onDragStart={(e) => onDragStart(e, id)}
          onDragOver={(e) => onDragOver(e, id)}
          onDragLeave={onDragLeave}
          onDrop={() => onDrop(id)}
          onDragEnd={onDragEnd}
          className={`group/d relative transition-all duration-150 ${
            dragId === id ? 'opacity-25 scale-[0.99]' : ''
          } ${overId === id ? 'ring-2 ring-blue-400/50 rounded-2xl ring-offset-1' : ''}`}
        >
          {/* Drag handle pill — appears on hover, top-center */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/d:opacity-100 transition-opacity z-20">
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium shadow-sm border cursor-grab active:cursor-grabbing select-none ${theme.cardBg || 'bg-white'} ${theme.border || 'border-gray-200'} ${theme.iconColor || 'text-gray-400'}`}
            >
              <GripVertical size={9} />
              {label}
            </div>
          </div>
          {(el.props as DashletSectionProps).children}
        </div>
      ))}
    </div>
  );
}
