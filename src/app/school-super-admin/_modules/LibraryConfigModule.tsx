'use client';
import React, { useState } from 'react';
import { X, Plus, Search, Trash2, Download, Upload, Save, Eye, RotateCcw, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import { SSAToggle, SectionCard, ModuleHeader, InputField, SelectField } from '../_helpers/components';
import { MasterPermissionGrid, BulkImportWizard } from '@/components/shared';
import type { Theme } from '../_helpers/types';

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Book {
  id: number; isbn: string; title: string; author: string; category: string;
  totalCopies: number; availableCopies: number; shelf: string; status: 'Active' | 'Inactive';
}
interface BorrowedBook {
  id: number; studentId: string; studentName: string; class: string;
  bookTitle: string; isbn: string; issueDate: string; dueDate: string;
}
interface OverdueBook {
  id: number; studentName: string; class: string; bookTitle: string;
  isbn: string; dueDate: string; daysOverdue: number; fineAmount: number;
}

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const INITIAL_BOOKS: Book[] = [
  { id: 1, isbn: '978-0-13-468599-1', title: 'Clean Code', author: 'Robert C. Martin', category: 'Reference', totalCopies: 5, availableCopies: 3, shelf: 'A-12', status: 'Active' },
  { id: 2, isbn: '978-81-203-5218-3', title: 'Mathematics Part I', author: 'NCERT', category: 'Textbook', totalCopies: 120, availableCopies: 47, shelf: 'B-01', status: 'Active' },
  { id: 3, isbn: '978-81-7450-869-4', title: 'Physics Part II', author: 'NCERT', category: 'Textbook', totalCopies: 110, availableCopies: 62, shelf: 'B-02', status: 'Active' },
  { id: 4, isbn: '978-0-06-112008-4', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', totalCopies: 8, availableCopies: 5, shelf: 'C-07', status: 'Active' },
  { id: 5, isbn: '978-93-5300-252-2', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Non-fiction', totalCopies: 15, availableCopies: 9, shelf: 'D-03', status: 'Active' },
  { id: 6, isbn: '978-0-7432-7356-5', title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', totalCopies: 10, availableCopies: 0, shelf: 'C-08', status: 'Active' },
  { id: 7, isbn: '978-81-7554-136-2', title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'Non-fiction', totalCopies: 6, availableCopies: 6, shelf: 'D-05', status: 'Inactive' },
];

const MOCK_STUDENTS_WITH_BOOKS: BorrowedBook[] = [
  { id: 1, studentId: 'STU-1042', studentName: 'Riya Sharma', class: '10-A', bookTitle: 'The Alchemist', isbn: '978-0-7432-7356-5', issueDate: '2026-02-18', dueDate: '2026-03-04' },
  { id: 2, studentId: 'STU-1042', studentName: 'Riya Sharma', class: '10-A', bookTitle: 'Physics Part II', isbn: '978-81-7450-869-4', issueDate: '2026-02-20', dueDate: '2026-03-06' },
  { id: 3, studentId: 'STU-2301', studentName: 'Arjun Patel', class: '9-B', bookTitle: 'Wings of Fire', isbn: '978-93-5300-252-2', issueDate: '2026-02-25', dueDate: '2026-03-11' },
];

const MOCK_OVERDUE: OverdueBook[] = [
  { id: 1, studentName: 'Meera Joshi', class: '8-C', bookTitle: 'Mathematics Part I', isbn: '978-81-203-5218-3', dueDate: '2026-02-15', daysOverdue: 18, fineAmount: 36 },
  { id: 2, studentName: 'Dev Kapoor', class: '11-A', bookTitle: 'Clean Code', isbn: '978-0-13-468599-1', dueDate: '2026-02-20', daysOverdue: 13, fineAmount: 26 },
  { id: 3, studentName: 'Priya Nair', class: '7-B', bookTitle: 'To Kill a Mockingbird', isbn: '978-0-06-112008-4', dueDate: '2026-02-22', daysOverdue: 11, fineAmount: 22 },
  { id: 4, studentName: 'Aakash Singh', class: '10-D', bookTitle: 'The Alchemist', isbn: '978-0-7432-7356-5', dueDate: '2026-02-28', daysOverdue: 5, fineAmount: 10 },
];

const PAGE_SIZE = 5;

type TabId = 'catalog' | 'operations' | 'settings';

export default function LibraryConfigModule({ theme, activeTab: externalTab, onTabChange }: { theme: Theme; activeTab?: string; onTabChange?: (tab: string) => void }) {
  // ── Loan Rules ──────────────────────────────────────────────────────────────
  const [maxBooks, setMaxBooks] = useState('2');
  const [loanPeriod, setLoanPeriod] = useState('14');
  const [finePerDay, setFinePerDay] = useState('2');
  const [libToggles, setLibToggles] = useState<Record<string, boolean>>({
    'Digital Library (eBooks)': false, 'Barcode/QR Scanning': true,
  });

  // ── Book Catalog ─────────────────────────────────────────────────────────────
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [bookSearch, setBookSearch] = useState('');
  const [bookPage, setBookPage] = useState(1);
  const [showAddBook, setShowAddBook] = useState(false);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({ isbn: '', title: '', author: '', category: 'Textbook', totalCopies: 1, availableCopies: 1, shelf: '', status: 'Active' });

  // ── Categories ───────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState(['Textbook', 'Reference', 'Fiction', 'Non-fiction', 'Periodical']);
  const [newCategory, setNewCategory] = useState('');
  const [catSearch, setCatSearch] = useState('');

  // ── Issue/Return workflow ─────────────────────────────────────────────────────
  const [issueTab, setIssueTab] = useState<'issue' | 'return'>('issue');
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string; class: string } | null>(null);
  const [searchBookForIssue, setSearchBookForIssue] = useState('');
  const [borrowedByStudent, setBorrowedByStudent] = useState<BorrowedBook[]>([]);

  // ── Overdue ──────────────────────────────────────────────────────────────────
  const [overdueSearch, setOverdueSearch] = useState('');
  const [overduePage, setOverduePage] = useState(1);

  // ── Tab State ──────────────────────────────────────────────────────────────
  const [internalTab, setInternalTab] = useState<TabId>('catalog');
  const activeTab = (externalTab as TabId) || internalTab;
  const setActiveTab = (tab: TabId) => { if (onTabChange) onTabChange(tab); else setInternalTab(tab); };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
    b.isbn.includes(bookSearch)
  );
  const bookPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const pagedBooks = filteredBooks.slice((bookPage - 1) * PAGE_SIZE, bookPage * PAGE_SIZE);

  const filteredOverdue = MOCK_OVERDUE.filter(o =>
    o.studentName.toLowerCase().includes(overdueSearch.toLowerCase()) ||
    o.bookTitle.toLowerCase().includes(overdueSearch.toLowerCase())
  );
  const overduePages = Math.ceil(filteredOverdue.length / PAGE_SIZE);
  const pagedOverdue = filteredOverdue.slice((overduePage - 1) * PAGE_SIZE, overduePage * PAGE_SIZE);

  const filteredCats = categories.filter(c => c.toLowerCase().includes(catSearch.toLowerCase()));

  function handleAddBook() {
    if (!newBook.title.trim() || !newBook.isbn.trim()) return;
    setBooks(p => [...p, { ...newBook, id: Date.now() }]);
    setNewBook({ isbn: '', title: '', author: '', category: 'Textbook', totalCopies: 1, availableCopies: 1, shelf: '', status: 'Active' });
    setShowAddBook(false);
  }
  function handleDeleteBook(id: number) { setBooks(p => p.filter(b => b.id !== id)); }
  function handleToggleBookStatus(id: number) {
    setBooks(p => p.map(b => b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b));
  }

  function handleStudentSearch() {
    const results = MOCK_STUDENTS_WITH_BOOKS.filter(s =>
      s.studentName.toLowerCase().includes(searchStudent.toLowerCase()) || s.studentId.includes(searchStudent)
    );
    if (results.length > 0) {
      setSelectedStudent({ id: results[0].studentId, name: results[0].studentName, class: results[0].class });
      setBorrowedByStudent(results.filter(r => r.studentId === results[0].studentId));
    } else {
      setSelectedStudent(null); setBorrowedByStudent([]);
    }
  }
  function handleReturnBook(borrowId: number) {
    setBorrowedByStudent(p => p.filter(b => b.id !== borrowId));
  }

  const booksForIssue = books.filter(b =>
    b.availableCopies > 0 && b.status === 'Active' &&
    (b.title.toLowerCase().includes(searchBookForIssue.toLowerCase()) || b.isbn.includes(searchBookForIssue))
  );

  return (
    <div className="space-y-4">
      <ModuleHeader title="Library Configuration" subtitle="Book catalog, loan rules, issue/return workflow, and overdue tracking" theme={theme} />

      {activeTab === 'catalog' && (<div className="space-y-4">
      {/* ── Book Catalog ─────────────────────────────────────────────────── */}
      <SectionCard title="Book Catalog" subtitle="Master list of all books — add, edit, toggle availability" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={bookSearch} onChange={e => { setBookSearch(e.target.value); setBookPage(1); }}
              placeholder="Search by title, author, or ISBN..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold whitespace-nowrap`}>{filteredBooks.length} books</span>
          <button onClick={() => {}} className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Download size={13} /> Export</button>
          <button onClick={() => {}} className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Upload size={13} /> Import</button>
          <button onClick={() => setShowAddBook(v => !v)} className={`flex items-center gap-1 px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={13} /> Add Book</button>
        </div>

        {/* Add Book inline form */}
        {showAddBook && (
          <div className={`mb-3 p-3 rounded-xl border ${theme.border} ${theme.secondaryBg} space-y-2`}>
            <p className={`text-xs font-bold ${theme.highlight} mb-1`}>New Book</p>
            <div className="grid grid-cols-3 gap-2">
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>ISBN *</p><InputField value={newBook.isbn} onChange={v => setNewBook(p => ({ ...p, isbn: v }))} theme={theme} placeholder="978-..." /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Title *</p><InputField value={newBook.title} onChange={v => setNewBook(p => ({ ...p, title: v }))} theme={theme} placeholder="Book title" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Author</p><InputField value={newBook.author} onChange={v => setNewBook(p => ({ ...p, author: v }))} theme={theme} placeholder="Author name" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Category</p><SelectField value={newBook.category} onChange={v => setNewBook(p => ({ ...p, category: v }))} options={categories} theme={theme} /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Total Copies</p><InputField value={String(newBook.totalCopies)} onChange={v => setNewBook(p => ({ ...p, totalCopies: Number(v), availableCopies: Number(v) }))} theme={theme} type="number" /></div>
              <div><p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Shelf Location</p><InputField value={newBook.shelf} onChange={v => setNewBook(p => ({ ...p, shelf: v }))} theme={theme} placeholder="e.g. A-12" /></div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={handleAddBook} className={`px-4 py-1.5 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Add</button>
              <button onClick={() => setShowAddBook(false)} className={`px-4 py-1.5 rounded-xl border ${theme.border} text-xs ${theme.iconColor}`}>Cancel</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${theme.secondaryBg}`}>
                {['ISBN', 'Title', 'Author', 'Category', 'Copies', 'Shelf', 'Status', 'Actions'].map(h => (
                  <th key={h} className={`text-[10px] font-bold ${theme.iconColor} px-3 py-2 text-left whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedBooks.map((b, i) => (
                <tr key={b.id} className={`border-t ${theme.border} ${i % 2 === 0 ? '' : theme.secondaryBg + '/40'} hover:${theme.secondaryBg} transition-colors`}>
                  <td className={`px-3 py-2 text-[10px] font-mono ${theme.iconColor}`}>{b.isbn}</td>
                  <td className={`px-3 py-2 text-xs font-semibold ${theme.highlight} max-w-[160px] truncate`}>{b.title}</td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{b.author}</td>
                  <td className={`px-3 py-2`}>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor} font-medium`}>{b.category}</span>
                  </td>
                  <td className={`px-3 py-2 text-xs ${theme.highlight} text-center`}>
                    <span className={b.availableCopies === 0 ? 'text-red-500 font-bold' : 'text-green-600 font-bold'}>{b.availableCopies}</span>
                    <span className={`${theme.iconColor}`}>/{b.totalCopies}</span>
                  </td>
                  <td className={`px-3 py-2 text-[10px] font-mono ${theme.highlight}`}>{b.shelf}</td>
                  <td className="px-3 py-2">
                    <button onClick={() => handleToggleBookStatus(b.id)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${b.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {b.status}
                    </button>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button className={`p-1 rounded-lg hover:${theme.secondaryBg} ${theme.iconColor}`}><Eye size={12} /></button>
                      <button onClick={() => handleDeleteBook(b.id)} className="p-1 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bookPages > 1 && (
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[10px] ${theme.iconColor}`}>Page {bookPage} of {bookPages}</span>
            <div className="flex gap-1">
              {Array.from({ length: bookPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setBookPage(p)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === bookPage ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Book Categories Table ────────────────────────────────────────────── */}
      <SectionCard title="Book Categories" subtitle="Manage catalogue categories used in the book master" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Search categories..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-lg ${theme.accentBg} ${theme.iconColor} font-bold`}>{filteredCats.length} categories</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {filteredCats.map(c => (
            <span key={c} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${theme.secondaryBg} text-xs font-medium ${theme.highlight}`}>
              {c}
              <button onClick={() => setCategories(p => p.filter(x => x !== c))} className="text-red-400 hover:text-red-600"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            placeholder="Add category..."
            className={`flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg} text-xs ${theme.highlight} outline-none`} />
          <button onClick={() => { if (newCategory.trim()) { setCategories(p => [...p, newCategory.trim()]); setNewCategory(''); } }}
            className={`px-3 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}><Plus size={14} /></button>
        </div>
      </SectionCard>
      </div>)}

      {activeTab === 'operations' && (<div className="space-y-4">
      {/* ── Issue / Return Workflow ──────────────────────────────────────────── */}
      <SectionCard title="Issue / Return Workflow" subtitle="Search a student, view their borrowed books, issue or return" theme={theme}>
        {/* Tabs */}
        <div className={`flex gap-1 mb-4 p-1 rounded-xl ${theme.secondaryBg} w-fit`}>
          {(['issue', 'return'] as const).map(t => (
            <button key={t} onClick={() => setIssueTab(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${issueTab === t ? `${theme.primary} text-white` : theme.iconColor}`}>
              {t === 'issue' ? 'Issue Book' : 'Return Book'}
            </button>
          ))}
        </div>

        {/* Student search */}
        <div className="flex gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={searchStudent} onChange={e => setSearchStudent(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStudentSearch()}
              placeholder="Search student by name or ID..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <button onClick={handleStudentSearch} className={`px-4 py-2 rounded-xl ${theme.primary} text-white text-xs font-bold`}>Search</button>
        </div>

        {selectedStudent && (
          <div className={`p-3 rounded-xl ${theme.secondaryBg} mb-3`}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} className={theme.iconColor} />
              <span className={`text-xs font-bold ${theme.highlight}`}>{selectedStudent.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-lg ${theme.accentBg} ${theme.iconColor}`}>{selectedStudent.class}</span>
              <span className={`text-[10px] ${theme.iconColor}`}>ID: {selectedStudent.id}</span>
              <span className={`ml-auto text-[10px] font-bold ${theme.iconColor}`}>{borrowedByStudent.length} book{borrowedByStudent.length !== 1 ? 's' : ''} borrowed</span>
            </div>

            {issueTab === 'return' && (
              borrowedByStudent.length > 0 ? (
                <div className="space-y-2">
                  {borrowedByStudent.map(b => (
                    <div key={b.id} className={`flex items-center justify-between p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div>
                        <p className={`text-xs font-semibold ${theme.highlight}`}>{b.bookTitle}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>ISBN: {b.isbn} · Issued: {b.issueDate} · Due: {b.dueDate}</p>
                      </div>
                      <button onClick={() => handleReturnBook(b.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-[10px] font-bold hover:bg-green-600">
                        <RotateCcw size={11} /> Return
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-xs ${theme.iconColor} italic`}>No books currently borrowed.</p>
              )
            )}

            {issueTab === 'issue' && (
              <div>
                <div className="flex gap-2 mb-2">
                  <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
                    <Search size={12} className={theme.iconColor} />
                    <input value={searchBookForIssue} onChange={e => setSearchBookForIssue(e.target.value)}
                      placeholder="Search available books..."
                      className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
                  </div>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {booksForIssue.slice(0, 5).map(b => (
                    <div key={b.id} className={`flex items-center justify-between p-2 rounded-lg border ${theme.border} ${theme.cardBg}`}>
                      <div>
                        <p className={`text-xs font-semibold ${theme.highlight}`}>{b.title}</p>
                        <p className={`text-[10px] ${theme.iconColor}`}>{b.author} · {b.shelf} · {b.availableCopies} available</p>
                      </div>
                      <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${theme.primary} text-white text-[10px] font-bold`}>
                        <ArrowRight size={11} /> Issue
                      </button>
                    </div>
                  ))}
                  {booksForIssue.length === 0 && <p className={`text-xs ${theme.iconColor} italic`}>No available books match your search.</p>}
                </div>
              </div>
            )}
          </div>
        )}
        {!selectedStudent && searchStudent && (
          <p className={`text-xs ${theme.iconColor} italic`}>No student found. Try a different name or ID.</p>
        )}
      </SectionCard>

      {/* ── Overdue Tracking ─────────────────────────────────────────────────── */}
      <SectionCard title="Overdue Tracking" subtitle="Books not returned past due date — fines calculated automatically" theme={theme}>
        <div className="flex items-center gap-2 mb-3">
          <div className={`flex items-center gap-1.5 flex-1 px-3 py-2 rounded-xl border ${theme.border} ${theme.inputBg}`}>
            <Search size={13} className={theme.iconColor} />
            <input value={overdueSearch} onChange={e => { setOverdueSearch(e.target.value); setOverduePage(1); }}
              placeholder="Search by student or book..."
              className={`flex-1 bg-transparent text-xs ${theme.highlight} outline-none`} />
          </div>
          <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-600 font-bold`}>
            <AlertCircle size={11} /> {filteredOverdue.length} overdue
          </span>
          <button className={`flex items-center gap-1 px-3 py-2 rounded-xl border ${theme.border} text-xs ${theme.iconColor} hover:opacity-80`}><Download size={13} /> Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={theme.secondaryBg}>
                {['Student', 'Class', 'Book', 'Due Date', 'Days Overdue', 'Fine (₹)', 'Action'].map(h => (
                  <th key={h} className={`text-[10px] font-bold ${theme.iconColor} px-3 py-2 text-left whitespace-nowrap`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedOverdue.map((o, i) => (
                <tr key={o.id} className={`border-t ${theme.border} ${i % 2 === 0 ? '' : theme.secondaryBg + '/40'}`}>
                  <td className={`px-3 py-2 text-xs font-semibold ${theme.highlight}`}>{o.studentName}</td>
                  <td className={`px-3 py-2 text-[10px] ${theme.iconColor}`}>{o.class}</td>
                  <td className={`px-3 py-2 text-[10px] ${theme.highlight} max-w-[140px] truncate`}>{o.bookTitle}</td>
                  <td className={`px-3 py-2 text-[10px] text-red-500 font-medium`}>{o.dueDate}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${o.daysOverdue > 14 ? 'bg-red-100 text-red-700' : o.daysOverdue > 7 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {o.daysOverdue}d
                    </span>
                  </td>
                  <td className={`px-3 py-2 text-xs font-bold text-red-600`}>₹{o.fineAmount}</td>
                  <td className="px-3 py-2">
                    <button className={`text-[10px] px-2.5 py-1 rounded-lg ${theme.primary} text-white font-bold hover:opacity-80`}>Collect Fine</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {overduePages > 1 && (
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[10px] ${theme.iconColor}`}>Page {overduePage} of {overduePages}</span>
            <div className="flex gap-1">
              {Array.from({ length: overduePages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setOverduePage(p)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold ${p === overduePage ? `${theme.primary} text-white` : `${theme.secondaryBg} ${theme.iconColor}`}`}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── Loan Rules + Features ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Loan Rules" subtitle="Limits and durations for book lending" theme={theme}>
          <div className="space-y-3">
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Max Books per Student</p>
              <InputField value={maxBooks} onChange={setMaxBooks} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Loan Period (days)</p>
              <InputField value={loanPeriod} onChange={setLoanPeriod} theme={theme} type="number" />
            </div>
            <div>
              <p className={`text-[10px] font-bold ${theme.iconColor} mb-1`}>Fine per Day (₹)</p>
              <InputField value={finePerDay} onChange={setFinePerDay} theme={theme} type="number" />
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Library Features" subtitle="Toggle digital library and scanning" theme={theme}>
          <div className="space-y-2">
            {Object.entries(libToggles).map(([feat, enabled]) => (
              <div key={feat} className={`flex items-center justify-between p-2.5 rounded-xl ${theme.secondaryBg}`}>
                <div className="flex-1 mr-3">
                  <p className={`text-xs font-bold ${theme.highlight}`}>{feat}</p>
                  <p className={`text-[10px] ${theme.iconColor}`}>{
                    ({
                      'Digital Library (eBooks)': 'Enable digital eBook library — students can read books online without physical copies',
                      'Barcode/QR Scanning': 'Use barcode or QR code scanner for quick book issue/return at the library counter',
                    } as Record<string, string>)[feat]
                  }</p>
                </div>
                <SSAToggle on={enabled} onChange={() => setLibToggles(p => ({ ...p, [feat]: !p[feat] }))} theme={theme} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      </div>)}

      {activeTab === 'settings' && (<div className="space-y-4">
      {/* ── Permissions ──────────────────────────────────────────────────────── */}
      <SectionCard title="Role-Based Permissions" subtitle="Control who can view, create, edit, delete, import, and export" theme={theme}>
        <div className="space-y-4">
          <MasterPermissionGrid masterName="Book Catalog" roles={['Super Admin', 'Principal', 'School Admin', 'Librarian', 'Teacher']} theme={theme} />
          <MasterPermissionGrid masterName="Book Categories" roles={['Super Admin', 'Principal', 'School Admin', 'Librarian', 'Teacher']} theme={theme} />
        </div>
      </SectionCard>

      {/* ── Bulk Import ──────────────────────────────────────────────────────── */}
      <SectionCard title="Bulk Import" subtitle="Import data from Excel templates" theme={theme}>
        <BulkImportWizard entityName="Books" templateFields={['ISBN', 'Title', 'Author', 'Publisher', 'Category', 'Copies', 'Shelf Location']} sampleData={[['978-0-13-468599-1', 'Clean Code', 'Robert C. Martin', 'Pearson', 'Reference', '5', 'A-12']]} theme={theme} />
      </SectionCard>
      </div>)}
    </div>
  );
}
