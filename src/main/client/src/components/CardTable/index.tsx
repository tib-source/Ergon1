import "../styling/generic_table.css"

const CardTable = ({ rows , children}: { rows: string[], children: React.ReactNode }) => {
    return (
        <table className="card-table">
            <thead>
                <tr>
                    {rows.map((row, index) => (
                        <th key={index}>
                            {row}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>

        </table>
    );
};


export default CardTable;
