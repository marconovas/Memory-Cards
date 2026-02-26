
export default function Card ({ data }) {
    const characters = data.slice(0,4);

    return(
        <div>
            <ul>
                {characters.map(e => (
                    <li key={e.id}>{e.name}</li>
                ))}
            </ul>
        </div>
    )
}