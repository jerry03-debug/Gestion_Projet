import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MdAdd, MdClose } from 'react-icons/md';

const ItemTypes = {
  TASK: 'task',
};

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-white p-2 rounded shadow-sm select-none mb-2 cursor-grab"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="font-bold">{task.name}</div>
      <div className="text-gray-600 text-sm">Assigné à: {task.assignedTo}</div>
      <div className="flex gap-1">
                    <p className="text-blue-600 text-xs">Du {task.startDate}</p>
                    <p className="text-blue-600 text-xs">Au {task.endDate}</p>
                </div>
    </div>
  );
};

const Section = ({ status, tasks, moveTask, addTask, members }) => {
  const [showForm, setShowForm] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleAddTask = (event) => {
    event.preventDefault();
    const { name, assignedTo, startDate,endDate } = event.target.elements;
    addTask({
      id: Math.random().toString(36).substring(7), // Un identifiant unique pour la tâche
      name: name.value,
      status,
      assignedTo: assignedTo.value,
      startDate: startDate.value,
      endDate: endDate.value
    });
    setShowForm(false);
  };

  return (
    <div
      ref={drop}
      className={`bg-gray-100 w-64 p-4 rounded-lg h-full ${isOver ? 'bg-blue-200' : ''}`}
    >
      <h2 className="text-sm font-bold mb-2">{status}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <button
        onClick={() => setShowForm(true)}
        className="mt-2 flex items-center justify-center w-full p-1 text-xs text-blue-600 rounded-md hover:scale-105 transition-all"
      >
        <MdAdd size="24" /> Ajouter une tâche
      </button>

      {showForm && (
        <div className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-sm flex justify-center items-center">
          <div className="p-4 border border-gray-300 bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between">
              <h2 className="text-xl mb-2">Ajouter une nouvelle tâche</h2>
              <MdClose size="32" color="red" onClick={() => setShowForm(false)} className="cursor-pointer" />
            </div>

            <form onSubmit={handleAddTask} className="flex flex-col space-y-4">
              <input type="text" name="name" placeholder="Nom de la tâche" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select name="assignedTo" required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Assigner à</option>
                {members.map((member, index) => (
                  <option key={index} value={member}>{member}</option>
                ))}
              </select>
              <div className="relative">
                                <span className="absolute -top-2 text-xs bg-white text-blue-500">Date de début</span>
                                <input type="date" name="startDate" placeholder="Date de début" required className="border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="relative">
                                <span className="absolute -top-2 text-xs bg-white text-blue-500">Date de fin</span>
                                <input type="date" name="endDate" placeholder="Date de fin" required className="border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">Ajouter</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default function GridComponent({ members }) {
  const initialTasks = [
    { id: 1, name: 'Tâche 1', status: 'À faire', assignedTo: 'Alice',startDate: "2023-06-01", endDate: "2023-06-14" },
    { id: 2, name: 'Tâche 2', status: 'En cours', assignedTo: 'Bob',startDate: "2023-06-01", endDate: "2023-06-14"},
    { id: 3, name: 'Tâche 3', status: 'Terminé', assignedTo: 'Charlie',startDate: "2023-06-01", endDate: "2023-06-14" },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-12">
        {['À faire', 'En cours', 'Terminé'].map((status) => (
          <Section
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
            addTask={addTask}
            members={members}
          />
        ))}
      </div>
    </DndProvider>
  );
}
