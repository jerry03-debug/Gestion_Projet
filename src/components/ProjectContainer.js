'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCirclePlus } from "react-icons/fa6";
import { MdClose, MdDelete, MdFilterList, MdAdd, MdSearch, MdDangerous } from "react-icons/md";
import GridComponent from './gridcomponent';

export default function ProjectContainer() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [showIncidentForm, setShowIncidentForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [projects, setProjects] = useState([
        { id: 1, name: "Projet A", status: "en cours", description: "Description du projet A", startDate: "2023-06-01", endDate: "2023-06-14", members: ["Alice", "Bob"], progress: 50, expenses: 1000 },
        { id: 2, name: "Projet B", status: "terminé", description: "Description du projet B", startDate: "2023-05-01", endDate: "2023-06-05", members: ["Charlie"], progress: 100, expenses: 2000 }
    ]);
    const [isDeletingProject, setIsDeletingProject] = useState(null);

    const [members, setMembers] = useState([]);
    const memberOptions = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"];

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const addProject = (newProject) => {
        setProjects([...projects, newProject]);
        setShowForm(false);
    };

    const deleteProject = (projectId) => {
        setIsDeletingProject(projectId); // Afficher la boîte de dialogue de confirmation
    };

    const confirmDeleteProject = () => {
        setProjects(projects.filter(project => project.id !== isDeletingProject));
        setIsDeletingProject(null); // Cacher la boîte de dialogue de confirmation après suppression
    };

    const cancelDeleteProject = () => {
        setIsDeletingProject(null); // Cacher la boîte de dialogue de confirmation
    };

    const handleAddMember = (event) => {
        const selectedMember = event.target.value;
        if (selectedMember && !members.includes(selectedMember)) {
            setMembers([...members, selectedMember]);
        }
    };

    const handleRemoveMember = (member) => {
        setMembers(members.filter(m => m !== member));
    };

    const navigateToTasks = (project) => {
        router.push('/taches', { project });
    };

    const handleIncidentSubmit = (event) => {
        event.preventDefault();
        const { description, photo, audio } = event.target.elements;
        console.log({
            description: description.value,
            photo: photo.files[0],
            audio: audio.files[0]
        });
        setShowIncidentForm(false);
    };

    const handleExpenseSubmit = (event) => {
        event.preventDefault();
        const { amount, libelleDepense } = event.target.elements;
        const newExpense = parseFloat(amount.value);
        if (!isNaN(newExpense) && newExpense > 0) {
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === selectedProject.id
                        ? { ...project, expenses: project.expenses + newExpense }
                        : project
                )
            );
        }
        setShowExpenseForm(false);
    };

    const projectList = projects?.map(project => (
        <div key={project.id} className="w-full bg-white shadow-md rounded-lg overflow-hidden hover:bg-blue-50 cursor-pointer flex items-center" onClick={() => setSelectedProject(project)}>
            <div className={`h-2 w-2 animate-ping rounded-full mx-4 my-2 ${getStatusColor(project.status)}`}></div>
            <div className="px-6 py-2 flex-grow">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                <div className="font-bold text-gray-600 italic text-xl mb-2">{project.description}</div>
                <div className="flex gap-1">
                    <p className="text-blue-600 text-xs">Du {project.startDate}</p>
                    <p className="text-blue-600 text-xs">Au {project.endDate}</p>
                </div>
                <p className="text-gray-700 text-base">Membres: {project.members.join(", ")}</p>
            </div>
            <MdDelete size="24" color="red" onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="cursor-pointer mx-4" />
        </div>
    ));

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, description, startDate, endDate } = event.target.elements;
        const newProject = {
            id: projects.length + 1,
            name: name.value,
            description: description.value,
            status: "Initialisé",
            startDate: startDate.value,
            endDate: endDate.value,
            members,
            progress: 0,
            expenses: 0
        };
        addProject(newProject);
        setMembers([]);
    };

    const breadcrumb = (
        <div className="flex items-center gap-2" >
            <span className="text-blue-500 text-xl cursor-pointer" onClick={() => setSelectedProject(null)}>Projets</span>
            {selectedProject && (
                <>
                    <span>&gt;</span>
                    <span>{selectedProject.name}</span>
                </>
            )}
        </div>
    );

    return (
        <div className="w-full bg-white flex flex-col gap-4 py-4">
            <div className="px-8">
                <h1 className="font-bold text-blue-500">{breadcrumb}</h1>
            </div>
            {selectedProject ? (
                <div className="flex flex-col px-8 gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Liste des tâches</h2>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input type="text" placeholder="Rechercher..." className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <MdSearch className="absolute right-2 top-3 text-gray-400" />
                            </div>
                            <MdFilterList size="24" className="cursor-pointer text-gray-600 hover:text-blue-500" />
                            <button onClick={() => setShowIncidentForm(true)} className="bg-yellow-500 text-xs w-fit text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition-all flex items-center gap-2">
                                <MdDangerous size="14" /> Déclarer un incident
                            </button>
                            <button onClick={() => setShowExpenseForm(true)} className="bg-green-500 text-xs w-fit text-white py-1 px-2 rounded-md hover:bg-green-600 transition-all flex items-center gap-2">
                                <MdAdd size="14" /> Ajouter une dépense
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-md bg-white italic">Avancement du projet</span>
                            </div>
                            <div className="w-full relative bg-gray-200 h-2 rounded">
                                <span className='absolute left-1/2 bottom-4 text-sm font-bold'>{selectedProject.progress}%</span>
                                <div className="bg-blue-500 h-2 rounded" style={{ width: `${selectedProject.progress}%` }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="font-bold text-lg">Dépenses</span>
                            <span className="text-gray-700">{selectedProject.expenses} €</span>
                        </div>
                    </div>
                    <div className="flex h-[50vh] border-blue-100 rounded w-full gap-4 max-w-6xl">
                        <GridComponent members={memberOptions} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="px-8 flex flex-col gap-4 w-full max-w-6xl">
                        {projectList}
                    </div>
                    <div className="hover:text-blue-700 hover:scale-95 transition-all cursor-pointer flex flex-col items-center" onClick={toggleForm}>
                        <p className="text-xl">Ajouter un nouveau projet</p>
                        <FaCirclePlus size="48" />
                    </div>
                </>
            )}

            {showForm && (
                <div className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="p-4 border border-gray-300 bg-white rounded-lg max-w-lg w-full">
                        <div className="flex justify-between">
                            <h2 className="text-xl mb-2">Ajouter un nouveau projet</h2>
                            <MdClose size="32" color="red" onClick={toggleForm} className="cursor-pointer" />
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input type="text" name="name" placeholder="Nom du projet" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <textarea type="text" name="description" placeholder="Description" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div className="relative">
                                <span className="absolute -top-2 text-xs bg-white text-blue-500">Date de début</span>
                                <input type="date" name="startDate" placeholder="Date de début" required className="border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <span className="absolute -top-2 text-xs bg-white text-blue-500">Date de fin</span>
                                <input type="date" name="endDate" placeholder="Date de fin" required className="border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <select onChange={handleAddMember} className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Ajouter un membre</option>
                                    {memberOptions?.map((member, index) => (
                                        <option key={index} value={member}>{member}</option>
                                    ))}
                                </select>
                                <div className="flex flex-wrap gap-2">
                                    {members?.map((member, index) => (
                                        <span key={index} className="flex items-center bg-blue-100 text-blue-700 p-2 rounded-md">
                                            {member}
                                            <MdClose size="16" onClick={() => handleRemoveMember(member)} className="cursor-pointer ml-2" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">Ajouter</button>
                        </form>
                    </div>
                </div>
            )}

            {showIncidentForm && (
                <div className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="p-4 border border-gray-300 bg-white rounded-lg max-w-lg w-full">
                        <div className="flex justify-between">
                            <h2 className="text-xl mb-2">Déclarer un incident</h2>
                            <MdClose size="32" color="red" onClick={() => setShowIncidentForm(false)} className="cursor-pointer" />
                        </div>

                        <form onSubmit={handleIncidentSubmit} className="flex flex-col space-y-4">
                            <textarea name="description" placeholder="Description de l'incident" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <div>
                                <label className="block text-gray-700">Photo</label>
                                <input type="file" name="photo" accept="image/*" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Audio</label>
                                <input type="file" name="audio" accept="audio/*" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">Déclarer</button>
                        </form>
                    </div>
                </div>
            )}

            {showExpenseForm && (
                <div className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="p-4 border border-gray-300 bg-white rounded-lg max-w-lg w-full">
                        <div className="flex justify-between">
                            <h2 className="text-xl mb-2">Ajouter une dépense</h2>
                            <MdClose size="32" color="red" onClick={() => setShowExpenseForm(false)} className="cursor-pointer" />
                        </div>

                        <form onSubmit={handleExpenseSubmit} className="flex flex-col space-y-4">
                            <input name="libelleDepense" placeholder="Libellé" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input name="amount" placeholder="Montant de la dépense (FCFA)" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all">Ajouter</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Boîte de dialogue de confirmation de suppression */}
            {isDeletingProject !== null && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="text-xl mb-2">Êtes-vous sûr de vouloir supprimer ce projet?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={confirmDeleteProject} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all">Supprimer</button>
                            <button onClick={cancelDeleteProject} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-all">Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case "en cours":
            return "bg-yellow-500";
        case "terminé":
            return "bg-green-500";
        case "en pause":
            return "bg-blue-500";
        default:
            return "bg-gray-400";
    }
}
