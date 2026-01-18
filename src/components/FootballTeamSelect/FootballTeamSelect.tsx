import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './FootballTeamSelect.module.scss';

interface FootballTeamSelectProps {
  teamList: string[];
  onSelect?: (team: string) => void;
}

export function FootballTeamSelect({
  teamList,
  onSelect,
}: FootballTeamSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTeams = useMemo(() => {
    return teamList.filter((team) =>
      team.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teamList, searchTerm]);

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

  const handleSelect = (team: string) => {
    setSelectedTeam(team);
    setSearchTerm('');
    setIsOpen(false);
    if (onSelect) onSelect(team);
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
        <span className={clsx(!selectedTeam && styles['placeholder-text'])}>
          {selectedTeam || 'Choose team...'}
        </span>
        <ChevronDown
          size={18}
          className={clsx(styles['arrow-icon'], isOpen && styles['is-rotated'])}
        />
      </div>

      {isOpen && (
        <div className={styles['dropdown-menu']}>
          <div className={styles['search-wrapper']}>
            <Search size={16} className={styles['search-icon']} />
            <input
              type="text"
              name="teamSearchBar"
              className={styles['search-input']}
              placeholder="Search team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <ul className={styles['options-list']}>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => (
                <li
                  key={team}
                  className={styles['option-item']}
                  onClick={() => handleSelect(team)}
                >
                  {team}
                </li>
              ))
            ) : (
              <li className={styles['no-results']}>No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
