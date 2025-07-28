'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SidebarAccordion = ({ sidebarLinks }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    sidebarLinks?.forEach((item, index) => {
      if (item?.sublinks?.some((sub) => pathname?.startsWith(sub?.link))) {
        setExpanded(`panel${index + 1}`);
      }
    });
  }, [pathname]);

  return (
    <div>
      {sidebarLinks?.map((item, index) => (
        <div key={index}>
          <Box>
            <Accordion
              expanded={
                item.sublinks == null ? null : expanded === `panel${index + 1}`
              }
              onChange={handleChange(`panel${index + 1}`)}
              sx={{
                boxShadow: 'none !important',
                width: '100%',
                border: 0,
                '.mui-vf72v2-MuiPaper-root-MuiAccordion-root.Mui-expanded': {
                  boxShadow: 'none !important',
                  border: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={item?.sublinks == null ? null : <ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={`panel${index + 1}a-header`}
                sx={{
                  mx: 'auto',
                  p: 1.4,
                  mb: 0,
                  minHeight: '55px',
                  gap: 2,
                  width: '95%',
                  height: '43px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRight: `${
                    item?.exact
                      ? item?.link == pathname
                        ? '2px solid #068987'
                        : null
                      : pathname?.startsWith(item?.link)
                        ? '2px solid #068987'
                        : null
                  }`,
                  borderRadius: '2px',
                  backgroundColor: `${
                    item?.exact
                      ? item?.link == pathname
                        ? '#E6F5F4'
                        : null
                      : pathname?.startsWith(item?.link)
                        ? '#E6F5F4'
                        : null
                  }`,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link href={`${item?.link}`} style={{ height: '23px' }}>
                    {item?.icon && (
                      <Box
                        component={'img'}
                        sx={{
                          width: 'auto',
                          height: '20px',
                          objectFit: 'contain',
                        }}
                        src={item?.icon}
                        alt="icon"
                      />
                    )}
                  </Link>
                  {item?.sublinks ? (
                    <Typography
                      variant="body1"
                      sx={{
                        width: '100%',
                        height: '100%',
                        fontWeight: `${item?.exact ? (item?.link == pathname ? 600 : 400) : pathname?.startsWith(item?.link) ? 600 : 400}`,
                        ml: 2,
                        color: '#595959',
                      }}
                    >
                      {item?.text}
                    </Typography>
                  ) : (
                    <Link
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      href={`${item?.link}`}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          width: '100%',
                          height: '100%',
                          fontWeight: `${item?.exact ? (item?.link == pathname ? 600 : 400) : pathname?.startsWith(item?.link) ? 600 : 400}`,
                          ml: 2,
                          color: '#595959',
                        }}
                      >
                        {item?.text}
                      </Typography>
                    </Link>
                  )}
                </Box>
              </AccordionSummary>
              {item?.sublinks &&
                item?.sublinks?.map((eachItem, index) => (
                  <div key={index}>
                    <Link href={`${eachItem?.link}`}>
                      <AccordionDetails
                        key={index}
                        sx={{
                          pl: 6.5,
                          pt: 1.5,
                          pb: 1.5,
                          mb: 0.7,
                          boxShadow: 'none !important',
                          alignItems: 'center',
                          '&:hover': { backgroundColor: '#E6F5F4 !important' },
                          borderRight: `${
                            item?.exact
                              ? eachItem?.link == pathname
                                ? '2px solid #068987'
                                : null
                              : pathname?.startsWith(eachItem?.link)
                                ? '2px solid #068987'
                                : null
                          }`,
                          borderRadius: '2px',
                          backgroundColor: `${
                            item?.exact
                              ? eachItem?.link == pathname
                                ? '#E6F5F4'
                                : null
                              : pathname?.startsWith(eachItem?.link)
                                ? '#E6F5F4'
                                : null
                          }`,
                        }}
                      >
                        <span style={{ width: '100%', height: '100%' }}>
                          <Typography
                            variant="body1"
                            sx={{
                              width: '100%',
                              height: '100%',
                              color: '#595959',
                            }}
                          >
                            {eachItem?.text}
                          </Typography>
                        </span>
                      </AccordionDetails>
                    </Link>
                  </div>
                ))}
            </Accordion>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default SidebarAccordion;
