import React from "react";
import BarChart from "@/components/chart"
import dynamic from "next/dynamic";
import PieChart from "@/components/piechart";
import ProjectTasksPieChart from "@/components/piechart";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });



const Dashboard = () => {

    const summary = [
        {
          title: 'Chercheurs',
          value: '100',
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="text-primaire" width="30" height="30" viewBox="0 0 16 16">
              <path fill="currentColor" fillRule="evenodd" d="M10 4.5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 0a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-9 8c0-.204.22-.809 1.32-1.459C4.838 10.44 6.32 10 8 10c1.68 0 3.162.44 4.18 1.041c1.1.65 1.32 1.255 1.32 1.459a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1m5.5-4c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4" clipRule="evenodd" />
            </svg>
          ),
        },
        {
          title: 'Etudiants',
          value: '300',
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="text-primaire" width="30" height="30" viewBox="0 0 256 256">
              <path fill="currentColor" d="m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z" />
            </svg>
          ),
        },
        {
          title: 'Dépenses',
          value: '30k',
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="text-primaire" width="30" height="30" viewBox="0 0 48 48">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M9.386 9.648A20.388 20.388 0 0 1 24 3.503c11.294 0 20.45 9.155 20.45 20.449S35.294 44.402 24 44.402S3.55 35.245 3.55 23.951c0-3.946 1.119-7.631 3.055-10.756" />
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M30.819 23.824a2.193 2.193 0 0 1-4.387 0v0c0-1.211.982-2.193 2.193-2.193h.001c1.211 0 2.193.982 2.193 2.193Z" />
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M24.649 17.04h10.71a2.78 2.78 0 0 1 2.786 2.773v8.01a2.78 2.78 0 0 1-2.774 2.785H24.649a2.78 2.78 0 0 1-2.786-2.773v-8.01a2.78 2.78 0 0 1 2.774-2.786h.012Z" />
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M35.85 30.562v2.75a2.78 2.78 0 0 1-2.773 2.787H14.41a2.78 2.78 0 0 1-2.786-2.774V14.592a2.78 2.78 0 0 1 2.774-2.786h18.665a2.78 2.78 0 0 1 2.785 2.774v2.504M1.45 16.563l5.395-3.952l.725 6.648" />
            </svg>
          ),
        },
        {
          title: 'Projets',
          value: '20/30',
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="text-primaire" width="30" height="30" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 4h-4.18a2.988 2.988 0 0 0-5.64 0H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h14a2.006 2.006 0 0 0 2-2V6a2.006 2.006 0 0 0-2-2Zm-7 0a1 1 0 1 1-1 1a1.003 1.003 0 0 1 1-1Zm-2 5l2.79 2.794l2.52-2.52L14 8h4v4l-1.276-1.311l-3.932 3.935L10 11.83l-2.586 2.584L6 13Zm9 10H5v-2h14Z" />
            </svg>
          ),
        },
        {
            title: 'Equipes',
            value: '10',
            svg: (
                <svg xmlns="http://www.w3.org/2000/svg"  className="text-primaire" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm-6.5 3a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5ZM21 10.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm-9 .5a5 5 0 0 1 5 5v6H7v-6a5 5 0 0 1 5-5Zm-7 5c0-.693.1-1.362.288-1.994l-.17.014A3.5 3.5 0 0 0 2 17.5V22h3v-6Zm17 6v-4.5a3.5 3.5 0 0 0-3.288-3.494c.187.632.288 1.301.288 1.994v6h3Z"/></svg>
            ),
          },
    ];


    const ProgressBar = ({ percent }) => {
        return (
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="w-full mr-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${percent}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primaire"
                  ></div>
                </div>
              </div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200">
                {`${percent}%`}
              </span>
            </div>
          </div>
        );
    };
    

    

    const latestProjectsData = [
    {
        title: 'Redesign du Site Web',
        completion: 70,
        description: 'Refonte complète du site web pour améliorer l\'expérience utilisateur.',
        budget: '15,000€',
        teamName: 'Équipe Créative',
        projectManager: 'Alexandre Dupont'
    },
    {
        title: 'Développement d\'une Application Mobile',
        completion: 45,
        description: 'Création d\'une application mobile',
        budget: '25,000€',
        teamName: 'Équipe Mobile',
        projectManager: 'Marie Joly'
    },
    {
        title: 'Campagne Marketing Digitale',
        completion: 90,
        description: 'Lancement d\'une nouvelle campagne marketing pour augmenter la notoriété de la marque.',
        budget: '10,000€',
        teamName: 'Équipe Marketing',
        projectManager: 'Lucas Martin'
    },
    ];

    const successPercentage = 70;
    
  

  


      
      





    return (
        <div className="bg-white ">

        
            <h1 className="font-bold text-xl text-blue-600 mt-2 px-2">Dashboard</h1>

            <div className=" mt-2 w-full">


                <div className="flex flex-wrap lg:gap-6 lg:justify-between sm:gap-4 items-center ">
                   
                    {
                        summary.map((item, index) => (
                            <div key={index} className="flex bg-white  lg:p-4  sm:p-2 rounded-2xl space-x-6 w-full sm:w-full  md:justify-start  lg:w-1/6 flex-wrap">
                                <div className="bg-[#F4F7FE] p-3 rounded-full">
                                    {item.svg}
                                </div>
                                <div>
                                <p className="font-medium text-sm text-[#707EAE]">{item.title}</p>
                                <p className="font-bold text-2xl text-primaire">{item.value}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
                

                <div className="mt-10 w-full pb-10">

                    <div className="flex my-4 items-center justify-between h-full gap-6">
                        
                        

                        <div className="flex-none w-1/2 overflow-hidden bg-white rounded-xl p-4 ">
                            <h1 className="font-bold text-primaire text-2xl py-2">Projets récents</h1>

                            <div className="w-full flex  overflow-x-scroll gap-4 items-center h-full">
                            {latestProjectsData.map((project, index) => (

                                <div key={index} className="flex-none p-4 bg-slate-50 rounded-lg shadow-md mb-4 w-2/3 flex flex-col justify-between">
                                    <div className="flex gap-4">
                                        <div className="bg-green-400 p-4 rounded-xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10c5.52 0 10-4.48 10-10c0-5.52-4.48-10-10-10Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"/></svg>
                                        </div>
                                        <div className="flex flex-col  space-y-1 items-start">
                                            <div className="bg-primaire py-1 px-2 rounded-md">
                                                <h2 className="text-white text-sm m-0">{project.teamName}</h2>
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-bold">{project.title}</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex mt-4 ">
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fill-opacity=".25" d="M3 10c0-1.886 0-2.828.586-3.414C4.172 6 5.114 6 7 6h10c1.886 0 2.828 0 3.414.586C21 7.172 21 8.114 21 10z"/><rect width="18" height="15" x="3" y="6" stroke="currentColor" stroke-width="1.2" rx="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.2" d="M7 3v3m10-3v3"/><rect width="4" height="2" x="7" y="12" fill="currentColor" rx=".5"/><rect width="4" height="2" x="7" y="16" fill="currentColor" rx=".5"/><rect width="4" height="2" x="13" y="12" fill="currentColor" rx=".5"/><rect width="4" height="2" x="13" y="16" fill="currentColor" rx=".5"/></g></svg>
                                            <p className=" text-sm text-slate-400">Ajoutee:</p>
                                            <p className=" text-sm ">12 Juin</p> 
                                        </div>   
                                    </div>
                                    <hr className="my-4" />
                                    <ProgressBar percent={project.completion} />
                                    <div className="flex">
                                        <p className=" text-sm text-slate-400">Derniere modification:</p>
                                        <p className="text-sm ml-2"> 22 Mai 2024</p>
                                    </div>


                                {/* <h3 className="font-medium text-lg">{project.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{project.description}</p>
                                <div className="mt-2">
                                    <p><strong>Équipe :</strong> {project.teamName}</p>
                                    <p><strong>Chef de projet :</strong> {project.projectManager}</p>
                                </div>
                                <ProgressBar percent={project.completion} /> */}

                            </div>
                        ))}
                        </div>
                        </div>
                        <div className="w-1/2 bg-white  rounded-xl p-4">
                        <h1 className="font-bold text-primaire text-2xl py-2">Activités</h1>
                        <img
                src="/pie.png"
                alt="Pie"
                className="dark:hidden w-96  border-4 rounded-lg shadow"
              />
                            
                        </div>
            

                    </div>

                    <div className="w-full flex  gap-6 mt-6">
                      
                        <div className="lg:w-1/2  sm:w-full  p-4 bg-white rounded-xl">
                            <h1 className="font-bold text-primaire text-2xl py-2">Dépenses</h1>
                            <BarChart />
                        </div>
                    </div>

                </div>

            </div>

          
            
           
        </div>
    );
}
export default Dashboard;
