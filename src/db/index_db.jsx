import { useState, useEffect } from 'react'
import { openDB, deleteDB } from 'idb'

export const databaseName = 'myDatabase'
export const storeName = 'contents'

export const useIndexedDB = () => {
  const [db, setDB] = useState(null)

  useEffect(() => {
    ;(async () => {
      const database = await openDB(databaseName, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: 'id',
              autoIncrement: true
            })
          }
        }
      })
      setDB(database)
    })()
  }, [])

  return db
}

export const deleteIndexedDB = async () => {
  try {
    await deleteDB(databaseName)
    console.log(`Base de datos ${databaseName} borrada con éxito.`)
  } catch (error) {
    console.error(`Error al borrar la base de datos ${databaseName}: ${error}`)
  }
}
