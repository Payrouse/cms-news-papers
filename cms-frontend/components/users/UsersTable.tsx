import { Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
import { Color } from '../../utils/assets/Color';
import User from './users.types';

function UsersTable(users: User[]) {
  function renderUsersTable() {
    return (
      <div className="flex flex-col">
        <div>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      USUARIO
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NOMBRE
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ROLES
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ESTADO
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      FECHA DE CREACIÓN
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => renderUser(user))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderUser(user: User) {
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Avatar src={user.photoUrl}>
              {`${user.name[0] + user.lastName[0]}`}
            </Avatar>
            {console.log(`${user.name[0].toUpperCase() + user.lastName[0].toUpperCase()}`)}
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.userName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{`${user.name} ${user.lastName}`}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user.role}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {user.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{user.createdAt}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <CreateIcon className="text-indigo-600" viewBox= "0 0 30 30" />
          <a className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </td>
      </tr>
    );
  }

  return renderUsersTable();
}

export default UsersTable;
