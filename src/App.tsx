import { useMemo, useState } from "react";
import { SortBy, User } from "./types.d";
import { UserLists } from "./components/UserLists";
import { useUsers } from "./hook/useUsers";

function App() {

  const {users, isError, isLoading, refetch, fetchNextPage, hasNextPage} = useUsers()


  const [showColors, setShowColors] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  // const originalUser = useRef<User[]>([]);

  const toogleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    // const filteredUser = users.filter((user) => user.email !== email);

    // setUsers(filteredUser);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleReset = () => {
    void refetch()
  };

  const filteredUser = useMemo(() => {
    console.log("calculate filteredUsers");
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLocaleLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    console.log("calculate sortedUsers");

    if (sorting === SortBy.NONE) return filteredUser;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return [...filteredUser].sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [sorting, filteredUser]);

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-7xl my-10">Prueba Técnica</h2>
      <header className="mb-10 flex justify-center gap-3">
        <button onClick={toogleColors} className="bg-gray-600 p-4 rounded-2xl">
          Colorear Filas
        </button>
        <button onClick={handleReset} className="bg-gray-600 p-4 rounded-2xl">
          Resetear Estado
        </button>
        <button
          onClick={toggleSortByCountry}
          className="bg-gray-600 p-4 rounded-2xl"
        >
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por país"}
        </button>
        <input
          type="text"
          placeholder="Filtrar por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main className="text-center">
      {users.length > 0 && (
          <UserLists
            changeSorting={handleChangeSort}
            onDeleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Ha habido un error</p>}
        {!isError && users.length === 0 && <p>No hay usuarios</p>}
        
        {
          !isLoading && !isError && hasNextPage === true && <button className="bg-black my-10 p-3 rounded-xl" onClick={() => {void fetchNextPage()}}>Cargar más resultados</button>
        }
        {
          !isLoading && !isError && hasNextPage === false && <p>Ya no hay más resultados</p>
        }
      </main>
    </div>
  );
}

export default App;
