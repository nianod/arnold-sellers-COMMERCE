type DeleteProps = {
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

export const DeleteProduct: React.FC<DeleteProps> = ({confirmDelete, setConfirmDelete, onConfirm}) => {
  if (!confirmDelete) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
 
      <div
        className="absolute inset-0 backdrop-blur-md"
        onClick={() => setConfirmDelete(false)}
      ></div>
 
      <div className="relative bg-gray-800 text-white rounded-lg p-6 w-80 shadow-lg z-50">
        <p className="mb-4">Are you sure you want to delete the selected item?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
