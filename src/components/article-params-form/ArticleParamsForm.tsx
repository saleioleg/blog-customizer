import { useState } from 'react';
import clsx from 'clsx';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	isOpen: boolean;
	settings: typeof import('../../constants/articleProps').defaultArticleState;
	onApply: (
		newSettings: typeof import('../../constants/articleProps').defaultArticleState
	) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	settings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [localSettings, setLocalSettings] = useState(settings);

	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setLocalSettings((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) => {
		setLocalSettings((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setLocalSettings((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBgColorChange = (option: (typeof backgroundColors)[number]) => {
		setLocalSettings((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleWidthChange = (option: (typeof contentWidthArr)[number]) => {
		setLocalSettings((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleApplyClick = () => {
		onApply(localSettings);
	};

	const handleResetClick = () => {
		setLocalSettings(settings);
		onReset();
	};

	return (
		<aside
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
				<div className={styles.group}>
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
				</div>

				<div className={styles.group}>
					<Select
						title='Цвет текста'
						options={fontColors}
						selected={localSettings.fontColor}
						onChange={handleFontColorChange}
					/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={localSettings.backgroundColor}
						onChange={handleBgColorChange}
					/>
				</div>

				<Separator />

				<div className={styles.group}>
					<Select
						title='Ширина контейнера'
						options={contentWidthArr}
						selected={localSettings.contentWidth}
						onChange={handleWidthChange}
					/>
				</div>

				<div className={styles.bottomContainer}>
					<Button title='Сбросить' type='clear' onClick={handleResetClick} />
					<Button title='Применить' type='apply' onClick={handleApplyClick} />
				</div>
			</form>
		</aside>
	);
};
