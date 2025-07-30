import TicketView from "../_partials/ticketView"

const CurrentTicket = async ({ params }) => {
    const { id } = await params
    return (
        <TicketView
            id={id}
        />
    )
}

export default CurrentTicket