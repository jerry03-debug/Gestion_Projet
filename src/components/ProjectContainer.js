'use client'
import { useRouter } from 'next/navigation';
import { FaCirclePlus } from "react-icons/fa6";
import { MdClose, MdDelete } from "react-icons/md";
import { useState } from "react";
import GridComponent from './gridcomponent';

export default function ProjectContainer() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([
        { id: 1, name: "Projet A", status: "en cours", description: "Description du projet A", startDate: "2023-06-01", endDate: "2023-06-14", members: ["Alice", "Bob"] },
        { id: 2, name: "Projet B", status: "terminé", description: "Description du projet B", startDate: "2023-05-01", endDate: "2023-06-05", members: ["Charlie"] }
    ]);

    const [members, setMembers] = useState([]);
    const memberOptions = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"];

    // Fonction pour afficher ou masquer le formulaire
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Fonction pour ajouter un nouveau projet
    const addProject = (newProject) => {
        setProjects([...projects, newProject]);
        setShowForm(false); // Masquer le formulaire après soumission
    };

    // Fonction pour supprimer un projet
    const deleteProject = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
    };

    // Fonction pour gérer les membres
    const handleAddMember = (event) => {
        const selectedMember = event.target.value;
        if (selectedMember && !members.includes(selectedMember)) {
            setMembers([...members, selectedMember]);
        }
    };

    const handleRemoveMember = (member) => {
        setMembers(members.filter(m => m !== member));
    };

    // Fonction pour naviguer vers la page des tâches
    const navigateToTasks = (project) => {
        router.push('/taches', { project });
    };

    // Affichage de la liste des projets
    const projectList = projects?.map(project => (
        <div key={project.id} className="w-full bg-white shadow-md rounded-lg overflow-hidden hover:bg-blue-50 cursor-pointer flex items-center" onClick={() => setSelectedProject(project)}>
            <div className={`h-2 w-2 animate-ping rounded-full mx-4 my-2 ${getStatusColor(project.status)}`}></div>
            <div className="px-6 py-2 flex-grow">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                <div className="font-bold text-gray-600 italic text-xl mb-2">{project.description}</div>
                <p className="text-blue-600 text-base">Du {project.startDate}</p>
                <p className="text-blue-600 text-base">Au {project.endDate}</p>
                <p className="text-gray-700 text-base">Membres: {project.members.join(", ")}</p>
            </div>
            <MdDelete size="24" color="red" onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="cursor-pointer mx-4" />
        </div>
    ));

    // Formulaire pour ajouter un nouveau projet
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
            members
        };
        addProject(newProject);
        setMembers([]);
    };

    // Breadcrumb dynamique
    const breadcrumb = (
        <div className="flex items-center gap-2" >
            <span className="text-blue-500 cursor-pointer" onClick={() => setSelectedProject(null)}>Projets</span>
            {selectedProject && (
                <>
                    <span>&gt;</span>
                    <span>{selectedProject.name}</span>
                </>
            )}
        </div>
    );

    return (
        <div className="w-full flex flex-col gap-4 py-4">
            <div className="px-8">
                <h1 className="font-bold text-blue-500">{breadcrumb}</h1>
            </div>
            {/* Afficher le contenu conditionnellement */}
            {selectedProject ? (
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-bold">{selectedProject.name}</h2>
                    <div className="flex flex-col items-center gap-4 w-full max-w-6xl">
                        <GridComponent/>
                    </div>
                </div>
            ) : (
                <>
                    {/* Liste des projets existants */}
                    <div className="px-8 flex flex-col gap-4 w-full max-w-6xl">
                        {projectList}
                    </div>
                    {/* Bouton pour ouvrir le formulaire */}
                    <div className="hover:text-blue-700 hover:scale-95 transition-all cursor-pointer flex flex-col items-center" onClick={toggleForm}>
                        <p className="text-xl">Ajouter un nouveau projet</p>
                        <FaCirclePlus size="48" />
                    </div>
                </>
            )}

            {/* Formulaire pour ajouter un nouveau projet */}
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
        </div>
    );
}

// Fonction utilitaire pour obtenir la couleur en fonction du statut
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
