'use client'
import React, { useState } from 'react';

const UserManagementPage = () => {
  // Exemple de données d'utilisateurs
  const initialUsers = [
    { id: 1, firstName: 'Mor talla', lastName: 'Ba', educationLevel: 'DIC3 Informatique', },
    { id: 2, firstName: 'Serigne Modou Mbacké', lastName: 'Fedior', educationLevel: 'Master 2', },
    { id: 3, firstName: 'Fatou ', lastName: 'Thiam', educationLevel: 'PhD', },
    { id: 4, firstName: 'Diery', lastName: 'Dia', educationLevel: 'Licence', },
  ];
  

  // State pour les utilisateurs avec useState
  const [users, setUsers] = useState(initialUsers);
  // State pour la modification de l'utilisateur
  const [editingUserId, setEditingUserId] = useState(null);

  // Fonction pour modifier un utilisateur
  const handleEditUser = (id) => {
    setEditingUserId(id);
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="w-[80vw] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Gestion des Utilisateurs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Prénom</th>
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Niveau d'Étude</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      defaultValue={user.firstName}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      defaultValue={user.lastName}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      defaultValue={user.educationLevel}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.educationLevel
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editingUserId === user.id ? (
                    <div className="flex justify-center items-center">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingUserId(null)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagementPage;
