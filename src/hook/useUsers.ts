import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../service/fetchUser";
import { User } from "../types.d";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number; users: User[] }>(
      ["users"],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: Infinity
      }
    );

  return {
    isLoading,
    isError,
    users: data?.pages.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
