import React, { useState } from 'react';
import { Camera, Bookmark, Home, Settings, FileText, Share2, Download, BookmarkPlus, Edit, X, Check } from 'lucide-react';

const JaviedNamaPreview = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showDefinition, setShowDefinition] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [bookmarkedLines, setBookmarkedLines] = useState([]);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentLineId, setCurrentLineId] = useState(null);
  const [lineNotes, setLineNotes] = useState({});
  
  // Sample data
  const poems = [
    { id: 1, title: 'خودی کا سر نہاں', englishTitle: 'The Secret of the Self' },
    { id: 2, title: 'رموز بیخودی', englishTitle: 'The Mysteries of Selflessness' },
    { id: 3, title: 'اسرار و رموز', englishTitle: 'Secrets and Mysteries' },
    { id: 4, title: 'گلشن راز جدید', englishTitle: 'The New Garden of Mystery' },
    { id: 5, title: 'بندگی نامہ', englishTitle: 'The Book of Servitude' },
  ];
  
  const currentPoem = {
    id: 1,
    title: 'خودی کا سر نہاں',
    englishTitle: 'The Secret of the Self',
    urduTitle: 'خودی کا راز',
    lines: [
      {
        persian: 'تو شبنمی، تو آفتابی',
        english: 'You are the dewdrop, you are the sun',
        urdu: 'تم شبنم ہو، تم آفتاب ہو'
      },
      {
        persian: 'رمز درخشندگی بیاب',
        english: 'Find the secret of radiance',
        urdu: 'چمک کا راز تلاش کرو'
      },
      {
        persian: 'گر درخود فرو شوی پیدا',
        english: 'If you dive deep within yourself',
        urdu: 'اگر تم اپنے اندر غوطہ لگاؤ'
      }
    ]
  };
  
  // Definition drawer content
  const definitions = {
    'آفتابی': {
      word: 'آفتابی',
      meanings: [
        { language: 'English', meanings: ['Sun', 'Sunshine', 'Solar', 'Radiant', 'Pertaining to the sun'] },
        { language: 'Urdu', meanings: ['سورج', 'دھوپ', 'تابناک', 'روشن', 'آفتاب سے متعلق'] }
      ],
      etymology: 'From Persian آفتاب (âftâb) + ‎-ی (-i)'
    },
    'شبنمی': {
      word: 'شبنمی',
      meanings: [
        { language: 'English', meanings: ['Dewy', 'Dew-like', 'Morning dew', 'Fresh', 'Pristine'] },
        { language: 'Urdu', meanings: ['شبنم جیسا', 'تر و تازہ', 'صبح کی اوس', 'نم'] }
      ],
      etymology: 'From Persian شبنم (šabnam) + ‎-ی (-i)'
    },
    'درخشندگی': {
      word: 'درخشندگی',
      meanings: [
        { language: 'English', meanings: ['Radiance', 'Brilliance', 'Luminosity', 'Splendor', 'Glitter'] },
        { language: 'Urdu', meanings: ['چمک', 'روشنی', 'آب و تاب', 'درخشاں'] }
      ],
      etymology: 'From Persian درخشنده (deraxšande) + ‎-گی (-gi)'
    }
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
    setShowDefinition(true);
    // Hide note editor if it's open
    if (showNoteEditor) {
      setShowNoteEditor(false);
    }
  };
  
  const toggleBookmark = (lineId, event) => {
    event.stopPropagation();
    if (bookmarkedLines.includes(lineId)) {
      setBookmarkedLines(bookmarkedLines.filter(id => id !== lineId));
    } else {
      setBookmarkedLines([...bookmarkedLines, lineId]);
    }
  };
  
  const openNoteEditor = (lineId, event) => {
    event.stopPropagation();
    setCurrentLineId(lineId);
    setCurrentNote(lineNotes[lineId] || '');
    setShowNoteEditor(true);
    // Hide definition drawer if it's open
    if (showDefinition) {
      setShowDefinition(false);
    }
  };
  
  const saveNote = () => {
    setLineNotes({
      ...lineNotes,
      [currentLineId]: currentNote
    });
    setShowNoteEditor(false);
  };
  
  const renderBookmarksScreen = () => (
    <div className="bg-amber-50 h-full flex flex-col">
      <div className="p-4 bg-amber-100 border-b border-amber-200">
        <h1 className="text-center text-2xl font-serif text-amber-800">Bookmarks</h1>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {bookmarkedLines.length > 0 ? (
          bookmarkedLines.map(lineId => {
            const line = currentPoem.lines[lineId];
            return (
              <div key={lineId} className="mb-4 p-4 bg-amber-100 rounded-lg shadow-sm border border-amber-200">
                <p className="text-right text-lg font-medium mb-2 text-amber-900" dir="rtl">{line.persian}</p>
                <div className="border-t border-amber-200 mt-2 pt-2">
                  <p className="text-sm text-amber-800">{line.english}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-amber-700">From: {currentPoem.title}</p>
                  <button 
                    className="text-amber-700 hover:text-amber-900"
                    onClick={(e) => toggleBookmark(lineId, e)}
                  >
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-amber-700">
            <Bookmark size={48} className="mb-4 opacity-50" />
            <p>No bookmarks yet</p>
            <p className="text-sm mt-2">Bookmark your favorite lines to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderNotesScreen = () => (
    <div className="bg-amber-50 h-full flex flex-col">
      <div className="p-4 bg-amber-100 border-b border-amber-200">
        <h1 className="text-center text-2xl font-serif text-amber-800">My Notes</h1>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {Object.keys(lineNotes).length > 0 ? (
          Object.entries(lineNotes).map(([lineId, note]) => {
            const line = currentPoem.lines[lineId];
            return (
              <div key={lineId} className="mb-4 p-4 bg-amber-100 rounded-lg shadow-sm border border-amber-200">
                <p className="text-right text-lg font-medium mb-2 text-amber-900" dir="rtl">{line.persian}</p>
                <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-amber-700">Your Note:</p>
                    <button 
                      onClick={(e) => openNoteEditor(parseInt(lineId), e)}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <Edit size={12} />
                    </button>
                  </div>
                  <p className="text-sm text-amber-800">{note}</p>
                </div>
                <p className="text-xs text-amber-700 mt-2">From: {currentPoem.title}</p>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-amber-700">
            <FileText size={48} className="mb-4 opacity-50" />
            <p>No notes yet</p>
            <p className="text-sm mt-2">Add notes to lines to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderHomeScreen = () => (
    <div className="bg-amber-50 h-full flex flex-col">
      <div className="p-4 bg-amber-100 border-b border-amber-200">
        <h1 className="text-center text-2xl font-serif text-amber-800">جاوید نامہ</h1>
        <p className="text-center text-amber-700">Javied Nama</p>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {poems.map(poem => (
          <div 
            key={poem.id} 
            className="mb-4 p-4 bg-amber-100 rounded-lg shadow-sm border border-amber-200 cursor-pointer"
            onClick={() => setCurrentScreen('poem')}
          >
            <h2 className="text-right text-xl font-medium text-amber-900">{poem.title}</h2>
            <p className="text-left text-amber-700">{poem.englishTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderPoemScreen = () => (
    <div className="bg-amber-50 h-full flex flex-col">
      <div className="p-4 bg-amber-100 border-b border-amber-200 flex justify-between items-center">
        <button onClick={() => setCurrentScreen('home')} className="text-amber-800">
          <Home size={20} />
        </button>
        <h1 className="text-center text-xl font-serif text-amber-800">{currentPoem.title}</h1>
        <button className="text-amber-800">
          <Camera size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {currentPoem.lines.map((line, index) => (
          <div key={index} className="mb-6 bg-amber-100 rounded-lg p-4 border border-amber-200">
            {/* Line content */}
            <p className="text-right text-lg font-medium mb-2 text-amber-900" dir="rtl">
              {line.persian.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="cursor-pointer hover:text-amber-600"
                  onClick={() => handleWordClick(word)}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            
            {/* Translations */}
            <div className="border-t border-amber-200 mt-2 pt-2">
              <div className="flex justify-between text-xs text-amber-700 mb-1">
                <span>English</span>
                <span>Urdu</span>
              </div>
              <div className="flex">
                <p className="flex-1 text-left text-sm text-amber-800">{line.english}</p>
                <p className="flex-1 text-right text-sm text-amber-800" dir="rtl">{line.urdu}</p>
              </div>
            </div>
            
            {/* Note display (if exists) */}
            {lineNotes[index] && (
              <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-amber-700">Your Note:</p>
                  <button 
                    onClick={(e) => openNoteEditor(index, e)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <Edit size={12} />
                  </button>
                </div>
                <p className="text-sm text-amber-800">{lineNotes[index]}</p>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex justify-end mt-2 space-x-2">
              <button 
                className="text-amber-700 hover:text-amber-900"
                onClick={(e) => openNoteEditor(index, e)}
              >
                <Edit size={16} />
              </button>
              <button 
                className={`${bookmarkedLines.includes(index) ? 'text-amber-800' : 'text-amber-700'} hover:text-amber-900`}
                onClick={(e) => toggleBookmark(index, e)}
              >
                {bookmarkedLines.includes(index) ? <Bookmark size={16} /> : <BookmarkPlus size={16} />}
              </button>
              <button className="text-amber-700 hover:text-amber-900">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Word Definition Drawer */}
      {showDefinition && selectedWord && definitions[selectedWord] && (
        <div className="bg-white border-t border-amber-300 rounded-t-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-amber-900">Word Definition</h3>
            <button 
              onClick={() => setShowDefinition(false)}
              className="text-amber-700"
            >
              <X size={18} />
            </button>
          </div>
          <h4 className="text-xl text-center mb-3 font-bold text-amber-800">{selectedWord}</h4>
          
          {/* Etymology */}
          <div className="mb-3 p-2 bg-amber-50 rounded">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Etymology:</span> {definitions[selectedWord].etymology}
            </p>
          </div>
          
          {/* Meanings in different languages */}
          {definitions[selectedWord].meanings.map((item, i) => (
            <div key={i} className="mb-3">
              <h5 className="font-medium text-amber-800 border-b border-amber-200 pb-1 mb-2">{item.language}:</h5>
              <div className={`${item.language === 'Urdu' ? 'text-right' : 'text-left'}`}>
                {item.meanings.map((meaning, j) => (
                  <p key={j} className="text-amber-700 mb-1">
                    <span className="text-amber-500 mr-2">•</span> {meaning}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Note Editor Drawer */}
      {showNoteEditor && (
        <div className="bg-white border-t border-amber-300 rounded-t-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-amber-900">Add Note</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowNoteEditor(false)}
                className="text-amber-700 hover:text-amber-900"
              >
                <X size={18} />
              </button>
              <button 
                onClick={saveNote}
                className="text-amber-700 hover:text-amber-900"
              >
                <Check size={18} />
              </button>
            </div>
          </div>
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="w-full p-2 border border-amber-300 rounded bg-amber-50 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={4}
            placeholder="Write your thoughts about this line..."
          />
        </div>
      )}
    </div>
  );
  
  const renderBottomNav = () => (
    <div className="bg-amber-100 border-t border-amber-200 flex justify-around p-2">
      <button 
        className={`p-2 ${currentScreen === 'home' ? 'text-amber-800' : 'text-amber-500'}`}
        onClick={() => setCurrentScreen('home')}
      >
        <Home size={24} />
      </button>
      <button 
        className={`p-2 ${currentScreen === 'bookmarks' ? 'text-amber-800' : 'text-amber-500'}`}
        onClick={() => setCurrentScreen('bookmarks')}
      >
        <Bookmark size={24} />
      </button>
      <button 
        className={`p-2 ${currentScreen === 'notes' ? 'text-amber-800' : 'text-amber-500'}`}
        onClick={() => setCurrentScreen('notes')}
      >
        <FileText size={24} />
      </button>
      <button 
        className={`p-2 ${currentScreen === 'settings' ? 'text-amber-800' : 'text-amber-500'}`}
        onClick={() => setCurrentScreen('settings')}
      >
        <Settings size={24} />
      </button>
    </div>
  );
  
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-amber-300 shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'poem' && renderPoemScreen()}
        {currentScreen === 'bookmarks' && renderBookmarksScreen()}
        {currentScreen === 'notes' && renderNotesScreen()}
      </div>
      {renderBottomNav()}
    </div>
  );
};

export default JaviedNamaPreview;
