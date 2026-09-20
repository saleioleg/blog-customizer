import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { ArrowButton } from 'src/ui/arrow-button';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentSettings, setCurrentSettings] = useState(defaultArticleState);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleClickOutside = (e: React.MouseEvent) => {
		if (isSidebarOpen) {
			const target = e.target as HTMLElement;

			// ПРОВЕРКА:
			// 1. Если клик НЕ по кнопке-стрелке
			// 2. И клик НЕ по самой форме (или её контейнеру)
			// Тогда закрываем.

			const isClickOnToggleButton = target.closest(
				'[role="button"][aria-label="Открыть/Закрыть форму параметров статьи"]'
			);
			const isClickOnForm = target.closest('aside'); // Твой aside.container из формы

			if (!isClickOnToggleButton && !isClickOnForm) {
				setIsSidebarOpen(false);
			}
		}
	};

	const handleApply = (newSettings: typeof defaultArticleState) => {
		setCurrentSettings(newSettings);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setCurrentSettings(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentSettings.fontFamilyOption.value,
					'--font-size': currentSettings.fontSizeOption.value,
					'--font-color': currentSettings.fontColor.value,
					'--container-width': currentSettings.contentWidth.value,
					'--bg-color': currentSettings.backgroundColor.value,
				} as CSSProperties
			}
			onClick={handleClickOutside}>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

			<ArticleParamsForm
				isOpen={isSidebarOpen}
				settings={currentSettings}
				onApply={handleApply}
				onReset={handleReset}
			/>

			<Article />
		</main>
	);
};
