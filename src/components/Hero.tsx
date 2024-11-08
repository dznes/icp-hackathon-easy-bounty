"use client";
import Web3 from "web3";
import contract from "../../instances/greetInstance"
// import web3 from "../../instances/web3";
import { useState } from "react";
/* eslint-disable */

//eslint-disable-next-line
const handleTransaction = async (name: string, setGreet: any, setList: any) => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask não encontrado! Por favor, instale o MetaMask.");
    return;
  }

  // Pedir permissão ao usuário para acessar a carteira MetaMask
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error("Usuário rejeitou a conexão com MetaMask", error);
    return;
  }
  const web3 = new Web3(window.ethereum);

  const instance = contract(web3);
  
  console.log("instance", instance);
  
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);

  
  const transaction = await instance.methods.greet(name).send({ from: accounts[0] });
  console.log("transaction", transaction);
  
  // const transaction = await instance.methods.names(0).call();
  // console.log("transaction", transaction);

  

  const contractReturn = await instance.methods.name().call();
  const list = await instance.methods.getList().call();
  console.log('list', list);
  // console.log("contract return", contractReturn);
  setGreet(contractReturn);
  setList(list);
  // return transaction;
}

export const Hero = () => {
  const [name, setName] = useState("");
  const [greet, setGreet] = useState("");
  const [list, setList] = useState([]);
  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center gap-10">
      <h2 className="text-4xl font-semibold tracking-tight text-white">{`Last name sent: ${greet ?? 'user'}`}</h2>
      <div className="flex items-center gap-4">
        <input
          placeholder="Your Name"
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={async ()=> {await handleTransaction(name, setGreet, setList)}}
              >
                Subscribe
              </button>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      List of names
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {list.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
              </div>
              </div>
        <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};
