import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './PredictionModelSelect.module.scss';

interface PredictionModelSelectProps {
  modelList: string[];
  onModelSelect?: (model: string) => void;
  defaultValue?: string;
}

const formatDisplayLabel = (value: string) => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function PredictionModelSelect({
  modelList,
  onModelSelect,
  defaultValue,
}: PredictionModelSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(
    defaultValue || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (model: string) => {
    setSelectedModel(model);
    setIsOpen(false);
    if (onModelSelect) onModelSelect(model);
  };

  return (
    <div className={styles['select-container']} ref={containerRef}>
      <div
        className={clsx(
          styles['select-trigger'],
          isOpen && styles['is-active']
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={clsx(!selectedModel && styles['placeholder-text'])}>
          {selectedModel
            ? formatDisplayLabel(selectedModel)
            : 'Select prediction model...'}
        </span>
        <ChevronDown
          size={18}
          className={clsx(styles['arrow-icon'], isOpen && styles['is-rotated'])}
        />
      </div>

      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <ul className={styles['options-list']}>
            {modelList.length > 0 ? (
              modelList.map((model) => (
                <li
                  key={model}
                  className={styles['option-item']}
                  onClick={() => handleSelect(model)}
                >
                  {formatDisplayLabel(model)}
                </li>
              ))
            ) : (
              <li className={styles['no-results']}>No models available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
