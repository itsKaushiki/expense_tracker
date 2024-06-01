import React, {useState, useContext} from "react"
import axios from 'axios'
const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) =>{
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

  //calculate incomes
  const addIncome = async (income) => {
    const response = await axios.post(`${https://expense-tracker-nu-seven.vercel.app/}add-income`, income)
        .catch((err) =>{
            setError(err.response.data.message)
        })
    getIncomes()
}

const getIncomes = async () => {
    const response = await axios.get(`${https://expense-tracker-nu-seven.vercel.app/L}get-incomes`)
    setIncomes(response.data)
    console.log(response.data)

}

const deleteIncome = async (id) => {
    const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
}

const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) =>{
        totalIncome = totalIncome + income.amount
    })

    return totalIncome;
}



    //calculate expenses
    const addExpense = async (income) => {
        const response = await axios.post(`${https://expense-tracker-nu-seven.vercel.app/}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${https://expense-tracker-nu-seven.vercel.app/}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${https://expense-tracker-nu-seven.vercel.app/}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }





return (
    <GlobalContext.Provider value={{addIncome,
    getIncomes,
    incomes, 
    deleteIncome, 
    totalIncome,
    expenses,
    addExpense,
    getExpenses,
    deleteExpense,
    totalExpenses,
    error,
    setError,
    totalBalance,
    transactionHistory
    }}>
        {children}
    </GlobalContext.Provider>
)

}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
