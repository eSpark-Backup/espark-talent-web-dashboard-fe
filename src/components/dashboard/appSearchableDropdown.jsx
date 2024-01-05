import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Input from './input';
import { filterDataByKeyword } from '@/src/utils/search';

const AppSearchableDropdown = ({
  selectedItem,
  isLoadingList,
  setIsLoadingList,
  setSelectedItem,
  data,
}) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  const [listData, setListData] = useState([...data]);
  const [searchItem, setSearchItem] = useState('');
  const [pointedElement, setPointedElement] = useState(selectedItem);

  const componentRef = useRef(null);
  useEffect(() => {
    const tempData = [...data];
    const timeoutId = setTimeout(() => {
      filterDataByKeyword(tempData, searchItem.trim() || '', setListData);
      setIsLoadingList(false);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchItem, data]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpenedDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpenedDropdown && pointedElement && componentRef.current) {
      const selectedElement = componentRef.current.querySelector(
        `[data-key="${pointedElement}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  }, [isOpenedDropdown, pointedElement]);
  const toggleComponent = () => {
    setIsOpenedDropdown((ps) => !ps);
  };
  const handleKeyDown = (event) => {
    if (!isOpenedDropdown) {
      return;
    }
    const selectedIndex = listData.indexOf(pointedElement);
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = Math.min(selectedIndex + 1, listData.length - 1);
        setPointedElement(listData[nextIndex]);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = Math.max(selectedIndex - 1, 0);
        setPointedElement(listData[prevIndex]);
        break;
      }
      case 'Enter': {
        event.preventDefault();
        setSearchItem('');
        setSelectedItem(pointedElement);
        setIsOpenedDropdown(false);
        break;
      }
      case 'Escape': {
        event.preventDefault();
        setPointedElement(selectedItem);
        setIsOpenedDropdown(false);
        break;
      }
      default:
        break;
    }
  };
  return (
    <Grid sx={{ position: 'relative' }} item xs={12} md={6}>
      <Box ref={componentRef}>
        <Box
          onClick={toggleComponent}
          display={'flex'}
          justifyContent={'space-between'}
          sx={{
            border: 'solid 1px #ccc',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            borderBottomLeftRadius: !isOpenedDropdown && '5px',
            borderBottomRightRadius: !isOpenedDropdown && '5px',
          }}
          p={'10px'}
        >
          <Typography sx={{ color: selectedItem ? '#000' : '#838383' }}>
            {selectedItem || 'Selected Employee...'}
          </Typography>

          {isOpenedDropdown ? (
            <Image
              src={'/images/hiring/icon-down.svg'}
              width={25}
              height={25}
              alt="Dropdown"
            />
          ) : (
            <Image
              src={'/icons/Dropdown.svg'}
              width={15}
              height={15}
              alt="Dropdown"
            />
          )}
        </Box>
        {isOpenedDropdown && (
          <Box
            sx={{
              border: 'solid 1px #ccc',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              borderTopLeftRadius: !isOpenedDropdown && '5px',
              borderTopRightRadius: !isOpenedDropdown && '5px',
              borderTop: 'none',
              position: 'absolute',
              width: '100%',
              background: '#fff',
              zIndex: 1,
            }}
          >
            <Box
              width="100%"
              p={'10px'}
              position="sticky"
              top="0"
              sx={{ background: '#fff', zIndex: 1 }}
            >
              <Input
                setIsLoading={setIsLoadingList}
                handleChange={setSearchItem}
                value={searchItem}
                prefixIcon="SearchIcon.svg"
                width={'100%'}
                onKeyDown={handleKeyDown}
                autofocus
              />
            </Box>
            <Box
              maxHeight="250px"
              sx={{
                overflow: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'transparent transparent',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {isLoadingList ? (
                <Box p={'10px'}>
                  <Typography>Loading...</Typography>
                </Box>
              ) : listData?.length ? (
                listData?.map((item, index) => (
                  <Box
                    onClick={() => {
                      setSearchItem('');
                      setSelectedItem(item);
                      setPointedElement(item);
                      setIsOpenedDropdown(false);
                    }}
                    key={index}
                    data-key={item}
                    className={`list-item-box ${
                      item === selectedItem || item === pointedElement
                        ? 'selected-list-item'
                        : ''
                    }`}
                    p={'10px'}
                    sx={{
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                      scrollbarWidth: 'none',
                      '-ms-overflow-style': 'none',
                    }}
                  >
                    <Typography>{item}</Typography>
                  </Box>
                ))
              ) : (
                <Box p={'10px'}>
                  <Typography>No item found</Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

AppSearchableDropdown.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  isLoadingList: PropTypes.bool.isRequired,
  setIsLoadingList: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default AppSearchableDropdown;
