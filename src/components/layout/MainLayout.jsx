import { useDSA } from '../../hooks/useDSA';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import NotesModal from '../modals/NotesModal';
import ShareModal from '../share/ShareModal';

/**
 * MainLayout Component
 * Wraps all pages with Navbar and Sidebar
 */
function MainLayout({ children }) {
  const { theme, showModal, completedProblem, shareQuote, currentStreak, userName, setShowModal } = useDSA();

  const handleCloseShareModal = () => {
    setShowModal(prev => ({ ...prev, share: false }));
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4 md:py-6">
            {children}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showModal.notes && <NotesModal />}
      {showModal.share && completedProblem && (
        <ShareModal
          isOpen={showModal.share}
          problem={completedProblem}
          streak={currentStreak}
          quote={shareQuote}
          userName={userName}
          onClose={handleCloseShareModal}
        />
      )}
    </div>
  );
}

export default MainLayout;

