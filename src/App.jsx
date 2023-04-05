import Layout from './layout/Layout';
import useDataFetching from './customHooks/useDataFetching';
import { API_ENDPOINTS } from './constants/urlConstants';
import { TOKEN_STORAGE } from './constants/tokenConstants';
import React, { useState, useEffect } from 'react';
import usePagination from './customHooks/usePagination';

export const DataContext = React.createContext();

function App() {
	const { data, isDataLoading, error, treeViewDataRef, setData, resetData } =
		useDataFetching(API_ENDPOINTS.GET_DATA, TOKEN_STORAGE.USER_DATA);
	const [changeToTreeView, setChangeToTreeView] = useState(false);
	const [sorting, setSorting] = useState('DESC');
	const [currentPage, setCurrentPage] = useState(1);

	const limitOfPages = 15;

	const { splitData, index, numberOfPages, setIndex } = usePagination(
		data,
		limitOfPages
	);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	return (
		<DataContext.Provider
			value={{
				limitOfPages,
				data,
				isDataLoading,
				error,
				splitData,
				index,
				changeToTreeView,
				numberOfPages,
				treeViewDataRef,
				currentPage,
				sorting,
				setSorting,
				setIndex,
				setData,
				resetData,
				setChangeToTreeView,
				setCurrentPage,
			}}
		>
			<Layout />
		</DataContext.Provider>
	);
}

export default App;
