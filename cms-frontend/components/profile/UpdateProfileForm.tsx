const UpdateProfileForm = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mx-32 p-4 w-full">
        <h1 className="mb-8 text-xl font-bold">Actualizar Perfil</h1>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-600 border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              placeholder="John"
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-600 border border-grey-lighter rounded py-3 px-4"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-600 border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-600 border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
