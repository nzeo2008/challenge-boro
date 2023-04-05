import { useState, useCallback, useRef, useEffect } from 'react';

import NodeCard from '../NodeCard/NodeCard';
import './treenode.css';

function TreeNode({ name, value }) {
	const [showNode, setShowNode] = useState(false);

	// Лимит для загрузки данных
	const [lastIndex, setLastIndex] = useState(20);

	// Ссылка на данные для IntersectionObserver
	const dataRef = useRef('');

	// Расширяем лимит на загрузку данных если при пересечении с текущим элементом
	// lastIndex меньше чем кол-во данных
	const handleIntersection = useCallback(
		(entries) => {
			if (entries[0].isIntersecting && lastIndex < value.length) {
				setLastIndex((prevLastIndex) => prevLastIndex + 10);
			}
		},
		[value.length, lastIndex]
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

	return (
		<li>
			<button
				onClick={() => {
					return setShowNode((prevState) => !prevState);
				}}
			>
				{showNode ? '-' : '+'}
			</button>
			<span className="node-name">{name}: </span>
			<ul
				className={
					showNode
						? 'node-cards-wrapper'
						: 'node-cards-wrapper-hidden'
				}
			>
				{value.slice(0, lastIndex).map((node) => {
					return (
						<NodeCard
							dataRef={dataRef}
							key={node.image}
							node={node}
						/>
					);
				})}
			</ul>
		</li>
	);
}

export default TreeNode;
