import { useState } from "react";

export default function CharacterCards({ data }) {

    const shuffle = (arr) =>
        [...arr].sort(() => Math.random() - 0.5);

    const [row1, setRow1] = useState(() => shuffle(data));
    const [row2, setRow2] = useState(() => shuffle(data));
    const [selectedRow1, setSelectedRow1] = useState(null);
    const [selectedRow2, setSelectedRow2] = useState(null);

    const resetGame = () => {
        setRow1(shuffle(data));
        setRow2(shuffle(data));
        setSelectedRow1(null);
        setSelectedRow2(null);
    };

    const handleSelectedRow1 = (id) => {
        setSelectedRow1(id);

        if (selectedRow2 !== null) {
            resetGame();
        }
    };

    const handleSelectedRow2 = (id) => {
        setSelectedRow2(id);

        if (selectedRow1 !== null) {
            resetGame();
        }
    };

    return (
        <>
            {row1.map(item => (
                <div key={item.id} onClick={() => handleSelectedRow1(item.id)}>
                    {item.name}
                </div>
            ))}

            {row2.map(item => (
                <div key={item.id} onClick={() => handleSelectedRow2(item.id)}>
                    {item.name}
                </div>
            ))}
        </>
    );
}