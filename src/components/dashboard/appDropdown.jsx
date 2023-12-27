import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { filterDataByKeyword } from '@/src/utils/search';

const AppDropdown = ({
  selectedItem,
  isLoadingList,
  setIsLoadingList,
  setSelectedItem,
  data,
  placeHolder,
  nested,
}) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  const [listData, setListData] = useState([...data]);
  const [searchItem, setSearchItem] = useState('');
  const [pointedElement, setPointedElement] = useState(selectedItem);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
  const [jobTitle, setJobTitle] = useState({
    category: '',
    title: '',
  });
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
    if (selectedItem) {
      setPointedElement(setPointedElement);
    }
  }, [selectedItem]);

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

  return (
    <Grid
      sx={{
        position: 'relative',
        width: { xs: '100%', md: '300px', background: '#fff', zIndex: 1 },
      }}
      item
    >
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
          <Typography>
            {(nested ? jobTitle?.title : selectedItem) || placeHolder}
          </Typography>
          <Image
            src={'/icons/Dropdown.svg'}
            width={15}
            height={15}
            alt="Dropdown"
          />
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
            <Box>
              {isLoadingList ? (
                <Box p={'10px'}>
                  <Typography>Loading...</Typography>
                </Box>
              ) : listData?.length ? (
                listData?.map(({ label, children }, index) => (
                  <Fragment key={index}>
                    <Box
                      onMouseEnter={() => {
                        setCurrentHoverIndex(index);
                      }}
                      onMouseLeave={() => {
                        if (!jobTitle?.category) {
                          setCurrentHoverIndex(null);
                        }
                        const categoryIndex = listData?.findIndex(
                          ({ label }) => label === jobTitle?.category
                        );
                        setCurrentHoverIndex(categoryIndex);
                      }}
                      onClick={() => {
                        if (!nested) {
                          setSelectedItem(label);
                          setIsOpenedDropdown(false);
                        }
                      }}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      data-key={{ label }}
                      className={`list-item-box ${
                        (label === jobTitle?.category ||
                          label === pointedElement) &&
                        'selected-list-item'
                      } ${
                        (label === selectedItem || label === pointedElement) &&
                        'selected-list-item'
                      }`}
                      p={'10px'}
                    >
                      <Typography>{label}</Typography>
                      {nested && (
                        <Image
                          src={'/icons/Next.svg'}
                          width={8}
                          height={8}
                          alt="Next"
                        />
                      )}
                      {children?.length && index === currentHoverIndex && (
                        <Box
                          sx={{
                            border: 'solid 1px #ccc',
                            position: 'absolute',
                            right: '-250px',
                            width: '250px',
                            background: '#fff',
                            top: '-1px',
                          }}
                        >
                          {children?.map((item, chIndex) => (
                            <Box
                              key={chIndex}
                              display={'flex'}
                              justifyContent={'flex-start'}
                              alignItems={'center'}
                              onClick={() => {
                                setSearchItem('');
                                setIsOpenedDropdown(false);
                                setJobTitle({
                                  title: item,
                                  category: label,
                                });
                              }}
                              data-key={{ chIndex }}
                              className={`list-item-box ${
                                item === jobTitle?.title ||
                                item === pointedElement
                                  ? 'selected-list-item'
                                  : ''
                              }`}
                              p={'10px'}
                            >
                              <Typography>{item}</Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Fragment>
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

AppDropdown.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  isLoadingList: PropTypes.bool.isRequired,
  setIsLoadingList: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default AppDropdown;
