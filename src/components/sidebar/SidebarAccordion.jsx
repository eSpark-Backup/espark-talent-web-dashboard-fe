'use client';
import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const SidebarAccordion = ({ sidebarLinks }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // 🔹 Find the link with longest match
  const getActiveLink = () => {
    let allLinks = [];

    sidebarLinks.forEach((item) => {
      allLinks.push(item);
      if (item.sublinks) {
        item.sublinks.forEach((sub) => allLinks.push(sub));
      }
    });

    const matches = allLinks.filter((l) => pathname.startsWith(l.link));

    if (matches.length === 0) return null;

    // longest link wins
    matches.sort((a, b) => b.link.length - a.link.length);
    return matches[0].link;
  };

  const activeLink = getActiveLink();

  // 🔹 Auto expand accordion if nested route is active
  useEffect(() => {
    sidebarLinks.forEach((item, index) => {
      if (item?.sublinks?.some((sub) => activeLink === sub.link)) {
        setExpanded(`panel${index + 1}`);
      }
    });
  }, [activeLink, sidebarLinks]);

  return (
    <div>
      {sidebarLinks?.map((item, index) => {
        const isActive = activeLink === item?.link;

        return (
          <Box key={index}>
            <Accordion
              expanded={
                item?.sublinks == null
                  ? false
                  : expanded === `panel${index + 1}`
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
                expandIcon={item?.sublinks ? <ExpandMoreIcon /> : null}
                sx={{
                  mx: 'auto',
                  // p: 1.4,
                  minHeight: '55px',
                  gap: 2,
                  width: '95%',
                  borderRight: isActive ? '2px solid #068987' : null,
                  backgroundColor: isActive ? '#E6F5F4' : null,
                  borderRadius: '2px',
                }}
              >
                <Link href={item?.link}>
                  {item?.icon && (
                    <Image width={20} height={20} src={item?.icon} alt="icon" />
                  )}
                </Link>

                {item?.sublinks ? (
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 2,
                      fontWeight: isActive ? 600 : 400,
                      color: '#595959',
                    }}
                  >
                    {item?.text}
                  </Typography>
                ) : (
                  <Link href={item?.link} style={{ width: '100%' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        ml: 2,
                        fontWeight: isActive ? 600 : 400,
                        color: '#595959',
                      }}
                    >
                      {item?.text}
                    </Typography>
                  </Link>
                )}
              </AccordionSummary>

              {item?.sublinks &&
                item?.sublinks.map((eachItem, i) => {
                  const isSubActive = activeLink === eachItem?.link;

                  return (
                    <Link href={eachItem?.link} key={i}>
                      <AccordionDetails
                        sx={{
                          pl: 6.5,
                          pt: 1.5,
                          pb: 1.5,
                          mb: 0.7,
                          '&:hover': {
                            backgroundColor: '#E6F5F4 !important',
                          },
                          borderRight: isSubActive ? '2px solid #068987' : null,
                          backgroundColor: isSubActive ? '#E6F5F4' : null,
                        }}
                      >
                        <Typography variant="body1" sx={{ color: '#595959' }}>
                          {eachItem?.text}
                        </Typography>
                      </AccordionDetails>
                    </Link>
                  );
                })}
            </Accordion>
          </Box>
        );
      })}
    </div>
  );
};

export default SidebarAccordion;
