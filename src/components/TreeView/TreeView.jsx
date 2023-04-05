import TreeNode from '../TreeNode/TreeNode';
import { useState, useContext } from 'react';
import { DataContext } from '../../App';
import Spinner from '../Spinner/Spinner';
import './treeview.css';

function TreeView() {
	const [showTree, setShowTree] = useState(false);
	const { isDataLoading, treeViewDataRef } = useContext(DataContext);

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
				{Object.entries(treeViewDataRef.current[0]).map(
					([key, value]) => {
						return (
							<ul key={key}>
								<TreeNode name={key} value={value} />
							</ul>
						);
					}
				)}
			</div>
		</main>
	);
}

export default TreeView;
