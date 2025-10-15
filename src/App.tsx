import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import sidebarDataImport from './sidebarData.json';
// @ts-ignore
import { marked } from 'marked';

const sidebarData: any = sidebarDataImport;

// Theme context for cross-site color theme
type Theme = 'dark' | 'light';
export const ThemeContext = createContext<{theme: Theme, setTheme: (t: Theme) => void}>({theme: 'dark', setTheme: () => {}});
function useTheme() { return useContext(ThemeContext); }

function Home() {
  const { theme } = useTheme();
  const linkColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-[#FEF3BB]' : 'border-[#224415]';
  const bgBox = theme === 'dark' ? 'bg-[#224415] text-white' : 'bg-[#FEF3BB] text-black';
  return (
    <>
      <div className="mb-8">
      </div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">oZep</h1>
          <div className={`border-2 p-4 mb-4 text-center text-gray-500 ${borderColor} ${bgBox}`}>
          <div className="h-48 flex items-center justify-center"><img src="https://github.com/oZep/oZep/blob/main/scrapped-idea/img/fish.webp?raw=true" alt="[image]" /></div>
        </div>
        <p className="text-sm text-center">Fish Are Cool</p>
        <p>Welcome to my blog!</p>
        <p>I keep/write a lot of notes but never really organized them in one place.</p>
        <p>My hopes are that making this and hosting it will motivate me to dig through my junk drawer and find them all.</p>
        <p>Thanks for stopping by.</p>
        <div className={`border-2 p-4 space-y-4 ${borderColor} ${bgBox}`}>
          <p> ! important info !</p>
          <p> It's a given that this site will always be a work in progress. </p>
          <p> If you find any issues, please let me know. </p>
          <p> If you have suggestions or want to contribute, please reach out. </p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <div className="space-x-4">
            <a href="https://joeyissa.is-a.dev/" className={`${linkColor} underline hover:no-underline`} target="_blank" rel="noopener noreferrer">contact</a>
          <a href="https://github.com/oZep/" className={`${linkColor} underline hover:no-underline`} target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://ozep.itch.io/" className={`${linkColor} underline hover:no-underline`} target="_blank" rel="noopener noreferrer">itch.io</a>
          <a href="#rss" className={`${linkColor} underline hover:no-underline`}>rss</a>
        </div>
      </div>
    </>
  );
}

function App() {
  // Theme state: 'dark' = #224415, 'light' = #FEF3BB
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to load from localStorage for persistence
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    return 'dark';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  const bgColor = theme === 'dark' ? 'bg-[#224415]' : 'bg-[#FEF3BB]';
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const linkColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-[#FEF3BB]' : 'border-[#224415]';
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen ${bgColor} ${textColor} font-mono py-4 sm:py-12`}>
        <div className="max-w-4xl mx-auto px-2 sm:px-8">
          <div className="text-center mb-8">
            {/*<pre className="text-sm">▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰</pre>*/}
          </div>
          {/* Mobile sidebar toggle */}
          <div className="sm:hidden flex justify-between items-center mb-4">
            <button
              className={`border-2 ${borderColor} px-3 py-2 rounded text-sm`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? 'Close Menu' : 'Menu'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`ml-2 underline hover:no-underline cursor-pointer border-2 ${borderColor} px-3 py-1 rounded`}
            >
              {theme === 'dark' ? 'light orange' : 'dark green'}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-12">
            {/* Sidebar */}
            <nav className={`border-2 ${borderColor}  sm:text-right space-y-1 pt-4 sm:pt-8 flex-shrink-0 ${sidebarOpen ? '' : 'hidden'} sm:block bg-opacity-90 sm:bg-transparent sm:border-none sm:bg-inherit p-4 sm:p-0 rounded sm:rounded-none z-20`}> 
              <div>
                <Link to="/" className={`${linkColor} font-bold cursor-pointer`} onClick={() => setSidebarOpen(false)}>about</Link>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => {navigate('/books'); setSidebarOpen(false);}}>books</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.books.map((book: any) => (
                    <li key={book.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/book/${encodeURIComponent(book.file.replace(/\.md$/, ''))}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => {navigate('/events'); setSidebarOpen(false);}}>events</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.events.map((event: any) => (
                    <li key={event.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/event/${encodeURIComponent(event.file.replace(/\.md$/, ''))}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {event.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold cursor-pointer" onClick={() => {navigate('/notes'); setSidebarOpen(false);}}>notes</span>
                <ul className="pl-4 text-xs">
                  {sidebarData.notes.map((note: any) => (
                    <li key={note.file}>
                      <Link
                        className={`${linkColor} underline hover:no-underline cursor-pointer`}
                        to={`/notes/${encodeURIComponent(note.file.replace(/\.pdf$/, ''))}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {note.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <a className={`${linkColor} font-bold cursor-pointer`} onClick={() => setSidebarOpen(false)}>╰┈➤</a>
              </div>
              <div className="hidden sm:block">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`${linkColor} underline hover:no-underline cursor-pointer border-2 ${borderColor} px-3 py-1 rounded`}
                  >
                    {theme === 'dark' ? 'light orange' : 'dark green'}
                  </button>
                </div>
              </div>
            </nav>
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BooksLanding />} />
                <Route path="/book/:bookId" element={<BookPage />} />
                <Route path="/events" element={<EventsLanding />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/notes" element={<NotesLanding />} />
                <Route path="/notes/:noteId" element={<NotePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

// BookPage, EventPage, NotePage components
function BookPage() {
  const { bookId } = useParams();
  const { theme } = useTheme();
  const [markdownHtml, setMarkdownHtml] = useState('');
  useEffect(() => {
    if (bookId) {
      const base = import.meta.env.BASE_URL || '/blog/';
      fetch(`${base}books/${bookId}.md`).then(res => res.text()).then(md => {
        const result = marked.parse(md);
        if (result instanceof Promise) {
          result.then((html: string) => setMarkdownHtml(html));
        } else {
          setMarkdownHtml(result as string);
        }
      });
    }
  }, [bookId]);
  const bg = theme === 'dark' ? '#224415' : '#FEF3BB';
  const border = theme === 'dark' ? '#FEF3BB' : '#224415';
  const color = theme === 'dark' ? 'white' : 'black';
  // Custom style for headers
  const headerColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className="prose prose-neutral max-w-none" style={{ background: bg, color, padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
      <style>{`
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: ${headerColor} !important; }
        .prose a, .prose b, .prose strong, .prose em, .prose code { color: ${border} !important; }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    </div>
  );
}
function EventPage() {
  const { eventId } = useParams();
  const { theme } = useTheme();
  const [markdownHtml, setMarkdownHtml] = useState('');
  useEffect(() => {
    if (eventId) {
      const base = import.meta.env.BASE_URL || '/blog/';
      fetch(`${base}events/${eventId}.md`).then(res => res.text()).then(md => {
        const result = marked.parse(md);
        if (result instanceof Promise) {
          result.then((html: string) => setMarkdownHtml(html));
        } else {
          setMarkdownHtml(result as string);
        }
      });
    }
  }, [eventId]);
  const bg = theme === 'dark' ? '#224415' : '#FEF3BB';
  const border = theme === 'dark' ? '#FEF3BB' : '#224415';
  const color = theme === 'dark' ? 'white' : 'black';
  // Custom style for headers
  const headerColor = theme === 'dark' ? 'white' : 'black';
  return (
    <div className="prose prose-neutral max-w-none" style={{ background: bg, color, padding: '1.5rem', borderRadius: '0.5rem', position: 'relative' }}>
      <style>{`
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: ${headerColor} !important; }
        .prose a, .prose b, .prose strong, .prose em, .prose code { color: ${border} !important; }
        .prose img { max-width: 100%; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
    </div>
  );
}
function NotePage() {
  const { noteId } = useParams();
  const { theme } = useTheme();
  // For PDFs, just link to the file
  const border = theme === 'dark' ? '#224415' : '#FEF3BB';
  const bg = theme === 'dark' ? 'white' : '#FEF3BB';
  const base = import.meta.env.BASE_URL || '/blog/';
  return <iframe src={`${base}notes/${noteId}.pdf`} title={noteId} className="w-full h-[80vh] border-2" style={{ borderColor: border, background: bg }} />;
}

// Import landing pages
import BooksLanding from '../landings/books';
import EventsLanding from '../landings/events';
import NotesLanding from '../landings/notes';
export default App;
