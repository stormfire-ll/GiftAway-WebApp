

const consumerIdContext = React.createContext({
    consumerId: null,
    removeConsumerId: () => {

    },
    addConsumerId: () => {

    }
})



export const consumerIdProvider =  consumerIdContext.Provider
export default function useConsumerId() {
    return React.useContext(consumerIdContext)
}