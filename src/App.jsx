import Layout from './layout/Layout';
import useDataFetching from './customHooks/useDataFetching';
import { API_ENDPOINTS } from './constants/urlConstants';
import { TOKEN_STORAGE } from './constants/tokenConstants';
import React, { useState } from 'react';
import usePagination from './customHooks/usePagination';

export const DataContext = React.createContext();

function App() {
	const { data, isDataLoading, error, setData, resetData } = useDataFetching(
		API_ENDPOINTS.GET_DATA,
		TOKEN_STORAGE.USER_DATA
	);
	const [showMenu, setShowMenu] = useState(false);
	const [changeToTreeView, setChangeToTreeView] = useState(false);

	const limitOfPages = 9;

	const { splitData, splitDataRef, index, setIndex, nextPage, prevPage } =
		usePagination(data, limitOfPages);

	return (
		<DataContext.Provider
			value={{
				limitOfPages,
				data,
				isDataLoading,
				error,
				splitData,
				splitDataRef,
				index,
				changeToTreeView,
				showMenu,
				setShowMenu,
				setIndex,
				nextPage,
				prevPage,
				setData,
				resetData,
				setChangeToTreeView,
			}}
		>
			<Layout />
		</DataContext.Provider>
	);
}

export default App;
