import TreeNode from '../TreeNode/TreeNode';
import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { DataContext } from '../../App';
import Spinner from '../Spinner/Spinner';
import './treeview.css';

function TreeView() {
	const [showTree, setShowTree] = useState(false);
	// Лимит для загрузки данных
	const [lastIndex, setLastIndex] = useState(10);
	const { data, isDataLoading } = useContext(DataContext);
	// Ссылка на данные для IntersectionObserver
	const dataRef = useRef('');

	// Расширяем лимит на загрузку данных если при пересечении с текущим элементом
	// lastIndex меньше чем кол-во данных
	const handleIntersection = useCallback(
		(entries) => {
			if (entries[0].isIntersecting && lastIndex < data.length) {
				setLastIndex((prevLastIndex) => prevLastIndex + 10);
			}
		},
		[data, lastIndex]
	);

	// Создаём IntersectionObserver и подписываемся на пересечение
	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, {
			rootMargin: '0px',
			threshold: 1.0,
		});
		// При пересечении вызывается функция handleIntersection
		if (dataRef.current) {
			observer.observe(dataRef.current);
		}

		// Отписываемя от observer при размонтировании элемента
		return () => {
			observer.disconnect();
		};
	}, [handleIntersection, dataRef]);

	return isDataLoading ? (
		<Spinner />
	) : (
		<main className="tree-view-wrapper">
			<div>
				<button
					onClick={() => {
						return setShowTree((prevState) => !prevState);
					}}
				>
					{showTree ? '-' : '+'}
				</button>
				<span>Данные: </span>
			</div>
			<div
				className={
					showTree
						? 'tree-view-list-wrapper'
						: 'tree-view-list-wrapper-hidden'
				}
			>
				{data.slice(0, lastIndex).map((node, index) => {
					return (
						// Устанавливаем ссылку dataRef
						<ul key={node.image} ref={dataRef}>
							<TreeNode node={node} index={index} />
						</ul>
					);
				})}
			</div>
		</main>
	);
}

export default TreeView;
