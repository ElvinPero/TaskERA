import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import Task from "../components/Task";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
      setShowModal(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
    <section class="pt-24 bg-white">
    <div class="px-12 mx-auto max-w-7xl">
        <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span>Organise</span> <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">Tasks Like</span> <span>Never before</span>
            </h1>
            <p class="px-0 mb-2 text-lg text-gray-600 md:text-xl lg:px-24">
            Effortlessly Organize, Prioritize, and Achieve Your Goals with Our Innovative Task Management Solutions.
            </p>
            
        </div>
        <div class="w-full mx-auto mt-10 text-center md:w-10/12">
            <div class="relative z-0 w-full mt-8">
                <div class="relative overflow-hidden shadow-2xl">
                    <div class="flex items-center flex-none px-4 bg-slate-600 rounded-b-none h-11 rounded-xl">
                        <div class="flex space-x-1.5">
                            <div class="w-3 h-3 border-2 border-white rounded-full"></div>
                            <div class="w-3 h-3 border-2 border-white rounded-full"></div>
                            <div class="w-3 h-3 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
      

        <div class="  flex flex-col justify-center relative gap-5  sm:py-12">
        {tasks.map((i) => (
          <Task
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
        

        </div>
        <button
        className="fixed top-20 right-20 bg-white text-black active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-full   shadow-2xl hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Task 
        <img className='w-34 h-34' src="https://img.icons8.com/nolan/96/add.png" alt="add" />
      </button>
      {showModal ? (
        <>
        <form onSubmit={submitHandler}>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Title : 
                  </h3>
                  <input className="text-3xl"
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <h3 className="text-3xl font-semibold">
                    Description : 
                  </h3>
                  <input className="text-2xl w-full h-20 border-none"
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button disabled={loading} type="submit"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  
                   
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>
       
      ) : null}
      
  

    </div>
</section>
    </>
  )
}

export default Home