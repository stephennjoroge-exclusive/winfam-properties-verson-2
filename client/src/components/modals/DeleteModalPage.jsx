import react from 'react'
import axios from 'axios'
import useDynamicAPI from '../../pages/useDynamicAPI'


const DeleteModal = ({id, setDeleteModal, landlord, setLandlord}) => {
  const {deleteAPI} = useDynamicAPI()
    const handleDelete = async () => {
      try {
        deleteAPI(`/landlords/${id}/`)
        setLandlord(prev => prev.filter(items => items.id !== id))
      } catch(error){
        console.log(error)
      }
  
    }
  return (
    <div className='flex fixed justify-center items-center inset-0 bg-black/15 z-50' >
      <div className="bg-white relative text-gray-700 dark:bg-gray-900 text-[10px] dark:text-gray-400 p-3 rounded-lg w-[300px]">
        <div>
          <p className='text-[15px]'>Are you sure you want to delete this record?</p>
        </div>
        <div className='flex justify-between'>
          <button className='bg-gray-400 text-white px-3 py-1 cursor-pointer rounded'  onClick={() => {setDeleteModal(false), console.log('steve')}}>Cancel</button>
          <button className='bg-red-500 text-white px-3 py-1 cursor-pointer rounded' onClick={() => {{handleDelete()}; setDeleteModal(false)}}>Delete</button>
        </div>

        

      </div>
    </div>
  )
}

export default DeleteModal

// const DeleteModal = ({ id, endpoint, setDeleteModal, setData }) => {
//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8000/${endpoint}/${id}/`)
//       setData(prev => prev.filter(item => item.id !== id))
//       setDeleteModal(null)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center w-[400px] text-gray-700 dark:text-gray-300">
//         <p className="mb-4 text-sm">Are you sure you want to delete this item?</p>
//         <div className="flex justify-center gap-4">
//           <button
//             className="bg-blue-600 text-white px-5 py-2 rounded"
//             onClick={handleDelete}
//           >
//             Delete
//           </button>
//           <button
//             className="bg-gray-400 text-white px-5 py-2 rounded"
//             onClick={() => setDeleteModal(null)}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DeleteModal

