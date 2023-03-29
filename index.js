import UserManager from "./manager/UserManager.js"

const userManager = new UserManager('./files/Users.json')

const env = async () => {
    //Mostramos los usuarios vacios.
    console.log(await userManager.getUsers())

    // await userManager.createUser({
    //     name: "Francisco",
    //     mail: "francaparroz21@gmail.com",
    //     username: "frn1337",
    //     password: "telacreisteweXD"
    // })

    // console.log(await userManager.getUsers())
    await userManager.validateUser("francaparroz21@gmail.com","telacreisteweXD")

    
}

env()