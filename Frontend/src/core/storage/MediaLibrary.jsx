import { useState, useEffect, useRef } from "react"
import { FileBox, UploadCloud, Search, Folder, Image as ImageIcon, FileText, MoreVertical, LayoutGrid, List, ChevronRight, Home, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/components/ui/ToastContext"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"

export function MediaLibrary() {
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const { addToast } = useToast()
  
  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  
  // Inputs state
  const [selectedFile, setSelectedFile] = useState(null)
  const [folderName, setFolderName] = useState("")
  const [actionFile, setActionFile] = useState(null)
  const [renameName, setRenameName] = useState("")

  // Navigation state
  const [currentFolder, setCurrentFolder] = useState(null) // null means root
  const [folderStack, setFolderStack] = useState([]) // array of { id, name } for breadcrumbs

  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Initialize with some dummy data including nested files
    setFiles([
      { id: 'root1', name: 'Marketing', type: 'folder', isFolder: true, parentId: null, createdAt: new Date().toISOString() },
      { id: 'root2', name: 'banner.png', type: 'image/png', size: 1024000, isFolder: false, parentId: null, createdAt: new Date().toISOString() },
      { id: 'root3', name: 'ssssss', type: 'folder', isFolder: true, parentId: null, createdAt: new Date().toISOString() },
      { id: 'root4', name: 'resume 9.pdf', type: 'application/pdf', size: 304128, isFolder: false, parentId: null, createdAt: new Date().toISOString() },
      { id: 'sub1', name: 'campaign.pdf', type: 'application/pdf', size: 512000, isFolder: false, parentId: 'root1', createdAt: new Date().toISOString() },
      { id: 'sub2', name: 'social-post.png', type: 'image/png', size: 204800, isFolder: false, parentId: 'root1', createdAt: new Date().toISOString() }
    ]);
    setIsLoading(false);
  }, [])

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const newFile = {
      id: Date.now().toString(),
      name: selectedFile.name,
      type: selectedFile.type || 'application/octet-stream',
      size: selectedFile.size,
      isFolder: false,
      parentId: currentFolder?.id || null,
      createdAt: new Date().toISOString()
    };
    setFiles([...files, newFile]);
    setSelectedFile(null);
    setIsUploadModalOpen(false);
    addToast("File uploaded successfully!");
  }

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      type: 'folder',
      isFolder: true,
      parentId: currentFolder?.id || null,
      createdAt: new Date().toISOString()
    };
    setFiles([...files, newFolder]);
    setFolderName("");
    setIsFolderModalOpen(false);
    addToast("Folder created successfully!");
  }

  const handleRename = (e) => {
    e.preventDefault();
    if (!renameName.trim() || !actionFile) return;
    setFiles(files.map(f => f.id === actionFile.id ? { ...f, name: renameName } : f));
    setIsRenameModalOpen(false);
    setActionFile(null);
    addToast("Renamed successfully!");
  }

  const handleDelete = (fileId) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setFiles(files.filter(f => f.id !== fileId));
    addToast("Deleted successfully!");
  }

  const navigateToFolder = (folder) => {
    setFolderStack([...folderStack, currentFolder].filter(Boolean))
    setCurrentFolder(folder)
    setSearchQuery("") // Clear search on navigation
  }

  const navigateToBreadcrumb = (index) => {
    if (index === -1) {
      setCurrentFolder(null)
      setFolderStack([])
    } else {
      setCurrentFolder(folderStack[index])
      setFolderStack(folderStack.slice(0, index))
    }
    setSearchQuery("") // Clear search on navigation
  }

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  const getFileIcon = (mimetype, isFolder) => {
    if (isFolder || mimetype === 'folder') return <Folder className="h-12 w-12 mb-3 text-yellow-500" />;
    if (mimetype && mimetype.includes('image')) return <ImageIcon className="h-12 w-12 mb-3 text-blue-500" />;
    return <FileText className="h-12 w-12 mb-3 text-red-500" />;
  }

  // Filter files based on current folder and search query
  const filteredFiles = files.filter(file => 
    file.parentId === (currentFolder ? currentFolder.id : null) &&
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-4 dark:border-slate-800 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <FileBox className="mr-2 h-6 w-6 text-slate-400" /> Media & Files
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your tenant's uploaded files and assets.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => { setFolderName(""); setIsFolderModalOpen(true); }}>
            <Folder className="mr-2 h-4 w-4" /> New Folder
          </Button>
          <Button onClick={() => { setSelectedFile(null); setIsUploadModalOpen(true); }}>
            <UploadCloud className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:text-white text-slate-900">
          <button 
            onClick={() => navigateToBreadcrumb(-1)}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
          >
            <Home className="h-4 w-4 mr-1" /> Root
          </button>
          {folderStack.map((folder, index) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
              <button 
                onClick={() => navigateToBreadcrumb(index)}
                className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400"
              >
                {folder.name}
              </button>
            </div>
          ))}
          {currentFolder && (
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {currentFolder.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800 space-y-4 sm:space-y-0 shrink-0">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900"
            />
          </div>
          <div className="flex items-center space-x-2 border rounded-md border-slate-200 p-1 dark:border-slate-700">
            <button className="p-1.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="p-1.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center text-slate-500 py-12">Loading files...</div>
          ) : filteredFiles.length === 0 ? (
             <div className="flex flex-col items-center justify-center text-slate-500 py-16 border rounded-xl border-dashed border-slate-300 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-900/20 dark:text-white">
               <Folder className="h-12 w-12 text-slate-300 mb-4 dark:text-slate-600" />
               <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                 {searchQuery ? 'No matching files found' : (currentFolder ? 'This folder is empty' : 'No files found')}
               </p>
               <p className="text-sm text-slate-500 mb-6 max-w-sm text-center">
                 {searchQuery ? 'Try adjusting your search terms.' : 'Get started by uploading a file or creating a new folder.'}
               </p>
               {!searchQuery && (
                 <div className="flex items-center space-x-3">
                   <Button variant="outline" onClick={() => { setFolderName(""); setIsFolderModalOpen(true); }}>
                     <Folder className="mr-2 h-4 w-4" /> New Folder
                   </Button>
                   <Button onClick={() => { setSelectedFile(null); setIsUploadModalOpen(true); }}>
                     <UploadCloud className="mr-2 h-4 w-4" /> Upload File
                   </Button>
                 </div>
               )}
             </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredFiles.map((file) => (
                <div 
                  key={file.id} 
                  onClick={() => {
                    if (file.isFolder) {
                      navigateToFolder(file)
                    } else if (file.url) {
                      window.open(`http://localhost:5000${file.url}`, '_blank')
                    } else {
                      addToast(`Opening ${file.name}... (Preview only available with backend)`);
                    }
                  }}
                  className="group relative flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center hover:border-primary/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="absolute right-2 top-2 z-10" onClick={(e) => e.stopPropagation()}>
                    <Dropdown 
                      trigger={
                        <button className="rounded p-1 text-slate-400 opacity-0 hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      }
                    >
                      <DropdownItem 
                        icon={Edit} 
                        onClick={() => {
                          setActionFile(file);
                          setRenameName(file.name);
                          setIsRenameModalOpen(true);
                        }}
                      >
                        Rename
                      </DropdownItem>
                      <DropdownItem 
                        icon={Trash2} 
                        onClick={() => handleDelete(file.id)}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                  {getFileIcon(file.mimetype, file.isFolder)}
                  <h3 className="w-full truncate text-sm font-medium text-slate-900 dark:text-white" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {file.isFolder ? new Date(file.createdAt).toLocaleDateString() : formatSize(file.size)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload File Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload File">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select File</label>
            <input 
              type="file" 
              required 
              onChange={(e) => setSelectedFile(e.target.files[0])} 
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {currentFolder && (
              <p className="mt-2 text-xs text-slate-500">Uploading to: <span className="font-medium">{currentFolder.name}</span></p>
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" disabled={isUploading} onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUploading || !selectedFile}>
              <UploadCloud className="mr-2 h-4 w-4" /> {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Folder Modal */}
      <Modal isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} title="Create New Folder">
        <form onSubmit={handleCreateFolder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Folder Name</label>
            <input 
              type="text" 
              required 
              value={folderName} 
              onChange={(e) => setFolderName(e.target.value)} 
              placeholder="e.g. Invoices 2024" 
              className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" 
            />
            {currentFolder && (
              <p className="mt-2 text-xs text-slate-500">Creating in: <span className="font-medium">{currentFolder.name}</span></p>
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" disabled={isUploading} onClick={() => setIsFolderModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUploading || !folderName.trim()}>
              <Folder className="mr-2 h-4 w-4" /> {isUploading ? 'Creating...' : 'Create Folder'}
            </Button>
          </div>
        </form>
      </Modal>
      {/* Rename Modal */}
      <Modal isOpen={isRenameModalOpen} onClose={() => setIsRenameModalOpen(false)} title="Rename">
        <form onSubmit={handleRename} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Name</label>
            <input 
              type="text" 
              required 
              value={renameName} 
              onChange={(e) => setRenameName(e.target.value)} 
              className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white text-slate-900" 
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
            <Button variant="outline" type="button" disabled={isUploading} onClick={() => setIsRenameModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUploading || !renameName.trim()}>
              <Edit className="mr-2 h-4 w-4" /> {isUploading ? 'Renaming...' : 'Rename'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
