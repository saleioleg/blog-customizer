import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	onUpdateArticle: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	onUpdateArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [localSettings, setLocalSettings] = useState(currentArticleState);
	const formRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleDocumentClick = (event: MouseEvent) => {
			const target = event.target as Node;

			if (formRef.current && formRef.current.contains(target)) {
				return;
			}

			setIsOpen(false);
		};

		document.addEventListener('click', handleDocumentClick);

		return () => {
			document.removeEventListener('click', handleDocumentClick);
		};
	}, [isOpen]);

	const createHandler =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setLocalSettings((prev) => ({ ...prev, [field]: option }));
		};

	const handleFontFamilyChange = createHandler('fontFamilyOption');

	const handleFontSizeChange = createHandler('fontSizeOption');
	const handleFontColorChange = createHandler('fontColor');
	const handleBackgroundColorChange = createHandler('backgroundColor');

	const handleWidthChange = createHandler('contentWidth');

	const handleFormSubmit = (isReset: boolean) => {
		if (isReset) {
			setLocalSettings(defaultArticleState);
			onUpdateArticle(defaultArticleState);
		} else {
			onUpdateArticle(localSettings);
		}

		setIsOpen(false);
	};

	return (
		<div ref={formRef} style={{ position: 'relative', width: '100%' }}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleFormSubmit(false);
					}}>
					<Text
						size={31}
						weight={800}
						uppercase={true}
						align='left'
						family='open-sans'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={localSettings.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={localSettings.fontSizeOption}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет текста'
						options={fontColors}
						selected={localSettings.fontColor}
						onChange={handleFontColorChange}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localSettings.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>

					<Select
						title='Ширина контейнера'
						options={contentWidthArr}
						selected={localSettings.contentWidth}
						onChange={handleWidthChange}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							onClick={() => handleFormSubmit(true)}
						/>
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
