import { BiRegularSelectMultiple } from 'solid-icons/bi';
import { FaSolidRankingStar } from 'solid-icons/fa';
import { IoCalendarOutline } from 'solid-icons/io';
import { TbInfoCircle, TbNetwork, TbSettings } from 'solid-icons/tb';
import { Component } from 'solid-js';
import ThemeChanger from './ThemeChanger';

const MenuBar: Component = () => {
  return (
    <div class='navbar bg-primary text-primary-content'>
      <div class='navbar-start'>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='Schedule'>
          <a class='btn btn-ghost' href='/schedule'>
            <IoCalendarOutline />
          </a>
        </div>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='Picks'>
          <a class='btn btn-ghost' href='/picks'>
            <BiRegularSelectMultiple />
          </a>
        </div>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='Standings'>
          <a class='btn btn-ghost' href='/standing'>
            <FaSolidRankingStar />
          </a>
        </div>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='ESPN Tools'>
          <a class='btn btn-ghost' href='/espn-util'>
            <TbNetwork />
          </a>
        </div>
      </div>
      <div class='navbar-center'>
        <span class='normal-case text-xl'>WL Pick Helper</span>
      </div>
      <div class='navbar-end'>
        <div class='w-auto'>
          <ThemeChanger />
        </div>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='About'>
          <a class='btn btn-ghost' href='/about'>
            <TbInfoCircle />
          </a>
        </div>
        <div class='tooltip tooltip-bottom tooltip-accent' data-tip='Settings'>
          <a class='btn btn-ghost' href='/config'>
            <TbSettings />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
