import { contentType } from './contentType'

const ContentList = ({ contents }) => {
  console.log(contents)

  return (
    <div className="rounded-lg bg-gray-200 p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">Lista de Contenidos</h2>
      <ul>
        {contents.map((content, index) => {
          return (
            <li key={index} className="mb-4 rounded-lg bg-white p-2 shadow">
              <div>
                <h3 className="text-lg font-semibold">{content.title}</h3>
                {content.duration && <p>Duración: {content.duration}</p>}
                {content.type === contentType.IMAGEN ? (
                  <img
                    src={content.path}
                    alt="Imagen"
                    className="mt-2 max-h-32 object-contain"
                  />
                ) : content.type === contentType.VIDEO ? (
                  <video
                    src={content.path.path}
                    alt={content.title}
                    className="mt-2 max-h-32 object-contain"
                  />
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ContentList
