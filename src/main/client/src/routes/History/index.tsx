import { Key, useEffect, useState } from 'react';
import Card from '../../components/Card';
import CardTable from '../../components/CardTable';
import '../../components/styling/history.css';
import { Tab, Tabs } from '../../components/Tabs';
import Env from '../../Env';
import Loader from '../../components/Loader';

const History: React.FC = () => {

    const rows = ["ID", "Name", "Request Date", "Status", "Action"];
    interface Booking {
        id: string;
        equipment: {
            id: string;
            name: string;
        };
        booked_from: string;
        status: string;
        returned: boolean;
        approved: boolean;
    }
    const [data, setData] = useState<Booking[]>([]);
    const [filtered, setFiltered] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const tabRows = ['Pending', 'Approved', 'Returned'];

    const fetchData = async () => {
        try {
            const response = await fetch(`${Env.BASE_URL}/bookings`);
            const bookings = await response.json();
            setData( bookings);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    }



    const filterData = (tabName: string) => {
        if (tabName === 'Pending') {
            setFiltered(data.filter(booking => !booking.approved));
        } else if (tabName === 'Approved') {
            setFiltered(data.filter(booking => booking.approved));
        } else {
            setFiltered(data.filter(booking => booking.returned));
        }
    }

    useEffect(() => {
        if (loading) {
            setTimeout(fetchData, 500);
        }
    }, []);

    useEffect(() => {
        filterData('Pending'); // Set initial tab data
    }, [data]);


    function getStatus(approved: boolean) {
        if (approved) {
            return 'Approved';
        } else {   
            return 'Pending';
        }
    }

    // TODO: Implement the cancel booking functionality

    return (
        <div className='history'>
            <h1 className="history__title">History</h1>
            { loading ? <Loader/> : 
            <Tabs handleFilter={filterData}>
                {tabRows.map((tabName, index) => (
                    <Tab  key={index} label={tabName}>
                        <CardTable rows={rows}>
                        {filtered.length === 0 && (
                            <div className='card-error'>
                                <span> No Results Found </span>
                            </div>
                            )}
                        {filtered.map((booking: Booking, index: Key ) => (
                                <Card key={index} rows={[booking.id, booking.equipment.name, booking.booked_from]}>
                                    <td>
                                        <span className={`status status__${getStatus(booking.approved).toLocaleLowerCase()}`}>
                                            {getStatus(booking.approved)}
                                        </span>
                                    </td>
                                    <td>
                                        <button className='styled__button'>Cancel</button>
                                    </td>
                                </Card>
                            ))}
                        </CardTable>
                    </Tab>

                ))}
            </Tabs>
        }
        </div>
    );
};

export default History;