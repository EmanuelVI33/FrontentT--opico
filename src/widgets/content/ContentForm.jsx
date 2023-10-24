import { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css' // Estilos de react-tabs
import { ImageForm } from './ImagenForm'
import { VideoForm } from './VideoForm'
import { MusicForm } from './MusicForm'

export default function ContentForm({ onAddContent }) {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabSelect = (index) => {
    setTabIndex(index)
  }

  return (
    <div className="mb-5">
      <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Imagen</Tab>
          <Tab>Video</Tab>
          <Tab>Música</Tab>
          <Tab>Presentador</Tab>
          {/* Agrega más pestañas para otros tipos de contenido */}
        </TabList>

        <TabPanel>
          <ImageForm onAddContent={onAddContent} />
        </TabPanel>

        <TabPanel>
          <VideoForm onAddContent={onAddContent} />
        </TabPanel>

        <TabPanel>
          <MusicForm onAddContent={onAddContent} />
        </TabPanel>

        <TabPanel>
          <VideoForm onAddContent={onAddContent} />
        </TabPanel>

        {/* Agrega más paneles para otros tipos de contenido */}
      </Tabs>
    </div>
  )
}
