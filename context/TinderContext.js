import {useState, createContext, useEffect} from 'react'
import { faker } from '@faker-js/faker'
import { useMoralis } from 'react-moralis'

export const TinderContext = createContext()

export const TinderProvider =({children})=>{

    const {authenticate, isAuthenticated, user, Moralis} = useMoralis()
    const [cardsData, setCardsData] = useState([])
    const [currentAccont, setCurrentAccont] = useState()
    const [currentUser, setCurrentUser] = useState()

    useEffect(()=>{
        checkWalletConnection()

        if(isAuthenticated){
            requestUsersData(user.get('ethAddress'))
            requestCurrentUserData(user.get('ethAddress'))
        }
    }, [isAuthenticated])
   
    const checkWalletConnection = async()=>{
        if(isAuthenticated){
            const address = user.get('ethAddress')
            setCurrentAccont(address)
            requestToCreateUserProfile(address, faker.name.findName())
        }else{
            setCurrentAccont('')
        }
    }

    const connectWallet = async() =>{
        if(!isAuthenticated){
            try{
                await authenticate({
                    signingMessage: 'Login using Moralis',
                })
            }catch (error){
                console.log(error)
            }
        }
    }

    const disconnectWallet = async()=>{
        await Moralis.User.logOut()
        setCurrentAccont('')
    }

    const requestToCreateUserProfile = async (walletAddress, name)=>{
        try{
            await fetch(`/api/createUser`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userWalletAddress: walletAddress,
                    name:name,
                }), 
            })

        }catch(error){
            console.log(error)
        }
    }

    const requestCurrentUserData = async (walletAddress) =>{
        try{
            const response = await fetch(
                `/api/fetchCurrentUserData?activeAccount=${walletAddress}`,
            )
            const data = await response.json()

            setCurrentUser(data.data)
        }catch(error){
            console.log(error)
        }
    }

    const requestUsersData = async (activeAccount) =>{
        try{
            const response = await fetch(
                `/api/fetchUsers?active Accounts=${activeAccount}`,
            )
            const data = await response.json()

            setCardsData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <TinderContext.Provider
            value = {{
                connectWallet,
                disconnectWallet,
                currentAccont,
                currentUser,
                cardsData,
            }}>{children}
        </TinderContext.Provider>
    )
}