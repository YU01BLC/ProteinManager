import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

export default function Header() {
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} size={'lg'} variant='outline' />
      <MenuList>
        <MenuItem command='⌘T'>New Tab</MenuItem>
        <MenuItem command='⌘N'>New Window</MenuItem>
      </MenuList>
    </Menu>
  );
}
