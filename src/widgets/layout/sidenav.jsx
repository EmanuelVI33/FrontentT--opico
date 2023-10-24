import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  IconButton,
  Typography
} from '@material-tailwind/react'
import { useMaterialTailwindController, setOpenSidenav } from '@/context'
import ContentList from '../content/ContentList'
import { useEffect, useState } from 'react'
import ContentForm from '../content/ContentForm'
import { storeName, useIndexedDB, deleteIndexedDB } from '@/db/index_db'

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController()
  const { sidenavColor, sidenavType, openSidenav } = controller
  const [contents, setContents] = useState([])
  const db = useIndexedDB()

  const handleAddContent = async (newContent) => {
    // const transaction = db.transaction(storeName, 'readwrite')
    // const objectStore = transaction.objectStore(storeName)

    // // const newItem = { text: newContent }
    // const id = await objectStore.add(newContent)

    setContents([...contents, { ...newContent }])
  }

  // useEffect(() => {
  //   if (!db) return
  //   ;(async () => {
  //     const transaction = db.transaction(storeName, 'readonly')
  //     const objectStore = transaction.objectStore(storeName)

  //     const data = await objectStore.getAll()

  //     setContents(data)

  //     console.log(data)
  //   })()
  // }, [db])

  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-blue-gray-800 to-blue-gray-900',
    white: 'bg-white shadow-lg',
    transparent: 'bg-transparent'
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 mr-2 h-[calc(100vh-32px)] w-80 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === 'dark' ? 'border-white/20' : 'border-blue-gray-50'
        }`}
      >
        <h3
          className={`${
            sidenavType === 'dark' ? ' text-white' : 'text-blue-gray'
          } pt-3 text-center text-lg`}
        >
          Generar Contenido
        </h3>
      </div>
      <div
        className="m-4 overflow-y-auto p-4" // Agrega el estilo de desbordamiento vertical automático y espacio de relleno
        style={{ maxHeight: 'calc(100% - 64px)' }} // Establece una altura máxima para evitar que el contenido desborde
      >
        <ContentForm onAddContent={handleAddContent} />
        {/* Agregar formularios para otros tipos de contenido aquí */}
        <ContentList contents={contents} />
        {/* <Button onClick={deleteIndexedDB}>Delete</Button> */}
        <Button>Generar</Button>
      </div>
    </aside>
  )
}

Sidenav.defaultProps = {
  brandImg: '/img/logo-ct.png',
  brandName: 'Material Tailwind React'
}

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
}

Sidenav.displayName = '/src/widgets/layout/sidnave.jsx'

export default Sidenav
