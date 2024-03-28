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
  disabled,
  padding,
  mb,
  error,
  isForm,
  background = '#FFF',
}) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false);
  const [isOpenedDropdownNested, setIsOpenedDropdownNested] = useState(false);
  const [listData, setListData] = useState([...data]);
  const [searchItem, setSearchItem] = useState('');
  const [pointedElement, setPointedElement] = useState(selectedItem);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
  const [selectedCatIndex, setSelectedCatIndex] = useState(null);
  const [jobTitle, setJobTitle] = useState({
    category: '',
    title: '',
  });
  const findLabelByValue = (value) => {
    for (let i = 0; i < data?.length; i++) {
      const { label, children } = data[i];
      if (children.includes(value)) {
        return { label, index: i };
      }
    }
    return { label: null, index: -1 }; // Return null if the value is not found in any children array
  };
  useEffect(() => {
    if (nested) {
      setJobTitle({
        category: findLabelByValue(selectedItem).label,
        title: selectedItem,
      });
      setCurrentHoverIndex(findLabelByValue(selectedItem).index);
    }
  }, [selectedItem]);

  const componentRef = useRef(null);
  const componentNestedRef = useRef(null);

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
      // console.log({contains:componentRef.current.contains(event.target),current:componentRef.current})
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
    if (disabled) return;
    setIsOpenedDropdown((ps) => !ps);
  };
  const toggleComponentNested = () => {
    setIsOpenedDropdownNested((ps) => !ps);
  };

  return (
    <Grid
      sx={{
        position: 'relative',
        background,
        // mb: '10px',
      }}
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      mb={mb || '10px'}
    >
      <Box
        ref={componentRef}
        sx={{
          display: { xs: nested ? 'none' : 'block', lg: 'block' },
        }}
      >
        <Box>
          <Box
            onClick={toggleComponent}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              border: `solid 1px ${error ? 'red' : 'rgba(0, 0, 0, 0.23)'}`,
              backgroundColor: disabled && '#f6f6f6',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              borderBottomLeftRadius: !isOpenedDropdown && '5px',
              borderBottomRightRadius: !isOpenedDropdown && '5px',
              cursor: 'no-drop',
              '&:hover': {
                borderColor: 'teal',
              },
            }}
            p={padding || '15px 10px'}
            height={40}
          >
            {!!placeHolder && !jobTitle?.title && !selectedItem ? (
              <Typography
                sx={{
                  color: '#838383',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  wordBreak: 'break-word',
                  lineHeight: 'normal',
                  overflow: 'hidden', // Hide any overflowing content
                  textOverflow: 'ellipsis', // Show an ellipsis (...) if text overflows
                  whiteSpace: 'nowrap',
                }}
              >
                {placeHolder}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  textOverflow: 'ellipsis', // Show an ellipsis (...) if text overflows
                  whiteSpace: 'nowrap',
                }}
              >
                {nested ? jobTitle?.title : selectedItem}
              </Typography>
            )}
            {isOpenedDropdown ? (
              <Image
                src={'/images/hiring/icon-down.svg'}
                width={20}
                height={20}
                alt="Dropdown"
              />
            ) : (
              <Image
                src={'/images/hiring/down-icon.svg'}
                width={20}
                height={20}
                alt="Dropdown"
              />
            )}
          </Box>
          {isOpenedDropdown && (
            <Box
              sx={{
                border: 'solid 1px rgba(0, 0, 0, 0.23)',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                borderTopLeftRadius: !isOpenedDropdown && '5px',
                borderTopRightRadius: !isOpenedDropdown && '5px',
                borderTop: 'none',
                position: 'absolute',
                width: '100%',
                background: '#fff',
                zIndex: 110,
              }}
            >
              <Box>
                {isLoadingList ? (
                  <Box p={'15px'}>
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
                          (label === selectedItem ||
                            label === pointedElement) &&
                          'selected-list-item'
                        }`}
                        p={'15px'}
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
                              border: 'solid 1px rgba(0, 0, 0, 0.23)',
                              position: 'absolute',
                              right: { xs: 0, md: '-100%' },
                              width: '100%',
                              background: '#fff',
                              top: '-1px',
                              zIndex: 105,
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
                                  if (isForm) {
                                    setSelectedItem(item);
                                  }
                                }}
                                data-key={{ chIndex }}
                                className={`list-item-box ${
                                  item === jobTitle?.title ||
                                  item === pointedElement
                                    ? 'selected-list-item'
                                    : ''
                                }`}
                                p={'15px'}
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
                  <Box p={'15px'}>
                    <Typography>No item found</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        ref={componentNestedRef}
        sx={{
          display: { xs: nested ? 'block' : 'none', lg: 'none' },
        }}
      >
        <Box>
          <Box
            onClick={toggleComponentNested}
            display={'flex'}
            justifyContent={'space-between'}
            sx={{
              border: 'solid 1px rgba(0, 0, 0, 0.23)',
              borderTopLeftRadius: '5px',
              borderTopRightRadius: '5px',
              borderBottomLeftRadius: !isOpenedDropdownNested && '5px',
              borderBottomRightRadius: !isOpenedDropdownNested && '5px',
              '&:hover': {
                borderColor: 'teal',
              },
            }}
            p={'10.5px'}
          >
            {!!placeHolder && !jobTitle?.title && !selectedItem ? (
              <Typography
                sx={{
                  color: '#838383',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  wordBreak: 'break-word',
                  lineHeight: 'normal',
                  overflow: 'hidden', // Hide any overflowing content
                  textOverflow: 'ellipsis', // Show an ellipsis (...) if text overflows
                  whiteSpace: 'nowrap',
                }}
              >
                {placeHolder}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: '#595959',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  textOverflow: 'ellipsis', // Show an ellipsis (...) if text overflows
                  whiteSpace: 'nowrap',
                }}
              >
                {nested ? jobTitle?.title : selectedItem}
              </Typography>
            )}
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
          {isOpenedDropdownNested && (
            <Box
              sx={{
                border: 'solid 1px rgba(0, 0, 0, 0.23)',
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                borderTopLeftRadius: !isOpenedDropdownNested && '5px',
                borderTopRightRadius: !isOpenedDropdownNested && '5px',
                borderTop: 'none',
                position: 'absolute',
                width: '100%',
                background: '#fff',
                zIndex: 110,
              }}
            >
              <Box>
                {isLoadingList ? (
                  <Box p={'15px'}>
                    <Typography>Loading...</Typography>
                  </Box>
                ) : listData?.length ? (
                  <Box>
                    <Box>
                      {!isLoadingList && selectedCatIndex !== null && (
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          p={'15px'}
                          onClick={() => setSelectedCatIndex(null)}
                        >
                          <Image
                            src={'/icons/Back.svg'}
                            width={8}
                            height={8}
                            alt="Next"
                          />
                          <Typography ml={'10px'}>Back</Typography>
                        </Box>
                      )}
                      {selectedCatIndex === null
                        ? listData?.map(({ label }, index) => (
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
                                    setIsOpenedDropdownNested(false);
                                  } else {
                                    setSelectedCatIndex(index);
                                    setIsOpenedDropdownNested(true);
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
                                  (label === selectedItem ||
                                    label === pointedElement) &&
                                  'selected-list-item'
                                }`}
                                p={'15px'}
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
                              </Box>
                            </Fragment>
                          ))
                        : listData[selectedCatIndex]?.children?.map(
                            (item, chIndex) => (
                              <Box
                                key={chIndex}
                                display={'flex'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                onClick={() => {
                                  setSearchItem('');
                                  setIsOpenedDropdownNested(false);
                                  setJobTitle({
                                    title: item,
                                    category: listData[selectedCatIndex]?.label,
                                  });
                                  if (isForm) {
                                    setSelectedItem(item);
                                  }
                                }}
                                data-key={{ chIndex }}
                                className={`list-item-box ${
                                  item === jobTitle?.title ||
                                  item === pointedElement
                                    ? 'selected-list-item'
                                    : ''
                                }`}
                                p={'15px'}
                              >
                                <Typography>{item}</Typography>
                              </Box>
                            )
                          )}
                    </Box>
                  </Box>
                ) : (
                  <Box p={'15px'}>
                    <Typography>No item found</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
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
