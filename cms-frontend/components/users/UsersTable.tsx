import { Avatar } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import React, { useState } from 'react';
import { UserRole, userStatus } from '../../models/user.model';
import { Color } from '../../utils/assets/Color';
import User from './users.types';

function UsersTable(users: User[]) {
  function renderUsersTable() {
    return (
      <div className="flex flex-col">
        <div>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="flex w-full flex w-full items-stretch md:items-center justify-items-start md:justify-items-center">
                    <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      USUARIO
                    </th>

                    <th className="w-1/5 px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NOMBRE
                    </th>

                    <th className="w-1/5 px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROLES
                    </th>

                    <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="pl-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FECHA DE CREACIÓN
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="flex flex-col bg-white w-full divide-y divide-gray-200 overflow-y-scroll"
                  style={{ height: '50vh' }}
                >
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
      <tr className="flex w-full items-stretch md:items-center justify-items-start md:justify-items-center mb-4 w-full">
        <td className="w-1/3 px-6 py-4">
          <div className="flex items-center">
            <Avatar src={user.photoUrl}>
              {`${user.name[0] + user.lastName[0]}`}
            </Avatar>
            {console.log(
              `${user.name[0].toUpperCase() + user.lastName[0].toUpperCase()}`,
            )}
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.userName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="w-1/4 px-6 py-4">
          <div className="text-sm text-gray-900">{`${user.name} ${user.lastName}`}</div>
        </td>
        <td className="w-1/4 px-6 py-4 text-sm text-gray-500">
          {user.role.map((rol) => UserRole[rol] + ' ')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {userStatus[user.status]}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {user.createdAt.split(' ')[0]}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="hover:underline">
            <CreateIcon
              className="text-indigo-600 hover:text-indigo-900"
              viewBox="0 0 30 30"
            />
            <a className="text-indigo-600 hover:text-indigo-900">Edit</a>
          </div>
        </td>
      </tr>
    );
  }

  return renderUsersTable();
}

export default UsersTable;
