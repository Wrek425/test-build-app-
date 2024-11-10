import React, { useState } from 'react';
import { useIssueStore, IssueStatus, IssuePriority, IssueType } from '../store/issueStore';
import { X, Upload, Calendar, Tag, DollarSign, User } from 'lucide-react';

const STATUS_COLORS = {
  open: 'bg-red-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500',
};

const PRIORITY_COLORS = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

const TYPE_ICONS = {
  defect: '🐛',
  observation: '👁️',
  rfi: '❓',
  safety: '⚠️',
};

export default function IssuePanel() {
  const { selectedIssue, updateIssue, selectIssue, deleteIssue, addComment } = useIssueStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');

  if (!selectedIssue) return null;

  const handleStatusChange = (status: IssueStatus) => {
    updateIssue(selectedIssue.id, { status });
  };

  const handlePriorityChange = (priority: IssuePriority) => {
    updateIssue(selectedIssue.id, { priority });
  };

  const handleTypeChange = (type: IssueType) => {
    updateIssue(selectedIssue.id, { type });
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateIssue(selectedIssue.id, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      assignedTo: formData.get('assignedTo') as string,
      dueDate: formData.get('dueDate') ? new Date(formData.get('dueDate') as string) : undefined,
      cost: formData.get('cost') ? Number(formData.get('cost')) : undefined,
    });
    setIsEditing(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(selectedIssue.id, newComment, 'Current User'); // Replace with actual user
    setNewComment('');
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const updatedTags = [...selectedIssue.tags, newTag.trim()];
    updateIssue(selectedIssue.id, { tags: updatedTags });
    setNewTag('');
  };

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white shadow-lg overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Issue Details</h2>
          <button
            onClick={() => selectIssue(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedIssue.title}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                defaultValue={selectedIssue.description}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                defaultValue={selectedIssue.assignedTo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                defaultValue={selectedIssue.dueDate?.toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                name="cost"
                defaultValue={selectedIssue.cost}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">{selectedIssue.title}</h3>
              <p className="text-gray-600 mt-2">{selectedIssue.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex gap-2">
                  {(['open', 'in-progress', 'resolved'] as IssueStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className={`px-3 py-1 rounded capitalize ${
                        selectedIssue.status === status
                          ? STATUS_COLORS[status] + ' text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as IssuePriority[]).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handlePriorityChange(priority)}
                      className={`px-3 py-1 rounded capitalize ${
                        selectedIssue.priority === priority
                          ? PRIORITY_COLORS[priority] + ' text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="flex gap-2">
                {(['defect', 'observation', 'rfi', 'safety'] as IssueType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-3 py-1 rounded capitalize flex items-center gap-1 ${
                      selectedIssue.type === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{TYPE_ICONS[type]}</span>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {selectedIssue.assignedTo || 'Unassigned'}
                </span>
              </div>
              {selectedIssue.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {selectedIssue.dueDate.toLocaleDateString()}
                  </span>
                </div>
              )}
              {selectedIssue.cost && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    ${selectedIssue.cost.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedIssue.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddTag} className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  <Tag size={16} />
                </button>
              </form>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedIssue.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Issue ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-blue-500">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      Add Image
                    </span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments
              </label>
              <div className="space-y-4 mb-4">
                {selectedIssue.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">{comment.content}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>{comment.createdBy}</span>
                      <span>{comment.createdAt.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteIssue(selectedIssue.id);
                  selectIssue(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}