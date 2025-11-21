"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdownmenu";
import {
    MoreVertical, Eye, CreditCard, XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SubscriptionsSection = () => {
    const subscriptions = [
        {
            id: 1,
            name: "Spotify Premium",
            amount: "7.99",
            period: "month",
            status: "Paid",
            icon: (
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21ZM14.4122 14.9108C14.7112 15.0816 15.0939 15.0019 15.2733 14.7172C15.4526 14.4326 15.357 14.0682 15.058 13.8975C12.427 12.3604 9.15012 12.0074 5.33511 12.8386C5.00025 12.9069 4.79695 13.2257 4.8687 13.5445C4.94046 13.8633 5.27532 14.0568 5.61018 13.9885C9.10228 13.2371 12.0562 13.5445 14.4122 14.9108ZM15.4168 12.3718C15.7875 12.5767 16.2659 12.4742 16.4931 12.1213C16.7203 11.7683 16.6007 11.3129 16.2539 11.108C13.1565 9.29766 8.63587 8.79669 5.00025 9.84417C4.58168 9.95802 4.35445 10.3679 4.47405 10.7664C4.59364 11.1535 5.02417 11.3698 5.44275 11.256C8.62391 10.3337 12.7259 10.7892 15.4168 12.3718ZM4.96437 8.30711C8.04986 7.41903 13.3717 7.58981 16.6007 9.41151C17.0432 9.67338 17.6173 9.52537 17.8684 9.09271C18.1315 8.67145 17.988 8.12494 17.5455 7.87445C13.8381 5.77949 7.95419 5.57455 4.41425 6.59926C3.92392 6.74727 3.6369 7.24824 3.79237 7.71505C3.94784 8.19325 4.47405 8.45512 4.96437 8.30711Z" fill="#1ED760" />
                </svg>
            ),
            iconBg: "bg-green-50",
            statusBadge: "bg-green-100 text-green-700 hover:bg-green-100",
        },
        {
            id: 2,
            name: "Youtube Music",
            amount: "79.99",
            period: "year",
            status: "Expiring",
            icon: (
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z" fill="#FF0000" />
                    <path d="M8.5 7.5L14 10.5L8.5 13.5V7.5Z" fill="white" />
                </svg>
            ),
            iconBg: "bg-red-50",
            statusBadge: "bg-gray-100 text-gray-600 hover:bg-gray-100",
        },
        {
            id: 3,
            name: "Prime Video",
            amount: "9.99",
            period: "month",
            status: "Paused",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.80284 13.1736C1.74643 13.1764 1.69106 13.1566 1.64803 13.1178C1.6113 13.0712 1.59424 13.0107 1.6008 12.9504V7.26104C1.59424 7.2008 1.6113 7.14028 1.64803 7.09371C1.69159 7.05857 1.74564 7.04184 1.80022 7.0463H2.38271C2.49291 7.03458 2.59209 7.11686 2.60836 7.23316L2.66608 7.45627C2.83375 7.28419 3.03185 7.14865 3.24857 7.05745C3.47029 6.96207 3.70722 6.91271 3.94652 6.91243C4.42353 6.8957 4.87955 7.12132 5.17447 7.52041C5.4993 7.99621 5.66067 8.57602 5.63102 9.16309C5.63994 9.58924 5.56306 10.0123 5.40537 10.4042C5.27523 10.7305 5.06375 11.013 4.79402 11.2213C4.53321 11.4104 4.22281 11.508 3.90716 11.5002C3.69279 11.5013 3.47974 11.4637 3.27744 11.3887C3.09141 11.3223 2.91955 11.218 2.77104 11.0819V12.956C2.77681 13.0157 2.76107 13.0757 2.72643 13.1234C2.68156 13.1602 2.62515 13.1769 2.569 13.1708L1.80284 13.1736ZM3.56868 10.5631C3.82792 10.5829 4.07876 10.4597 4.23251 10.2368C4.39598 9.92503 4.46997 9.56916 4.44505 9.21329C4.47023 8.85408 4.39729 8.49486 4.23514 8.1786C4.08086 7.95353 3.82739 7.82999 3.56606 7.8523C3.28872 7.85258 3.01689 7.93234 2.77891 8.08378V10.3289C3.01505 10.485 3.28793 10.567 3.56606 10.5659L3.56868 10.5631Z" fill="#00A8E1" />
                    <path d="M6.62808 11.4109C6.53415 11.4296 6.44363 11.3638 6.42605 11.2636C6.42211 11.2413 6.42211 11.2184 6.42605 11.1961V7.26096C6.41949 7.20072 6.43654 7.1402 6.47328 7.09363C6.51683 7.05849 6.57088 7.04176 6.62546 7.04622H7.20533C7.31553 7.0345 7.41471 7.11678 7.43098 7.23308L7.53593 7.69046C7.70832 7.47599 7.91429 7.29471 8.14466 7.15499C8.33253 7.0504 8.54139 6.99602 8.75339 6.99602H8.86622C8.92316 6.99072 8.98009 7.00745 9.02627 7.04343C9.06301 7.09 9.08006 7.15052 9.0735 7.21076V7.93031C9.07796 7.98832 9.06222 8.04577 9.0289 8.09206C8.98508 8.13111 8.92814 8.14924 8.87147 8.14226H8.72715C8.66759 8.14226 8.59255 8.14226 8.5015 8.14226C8.34985 8.14561 8.19871 8.1643 8.0502 8.19804C7.8954 8.22844 7.74426 8.27613 7.5989 8.34028V11.1989C7.6031 11.2569 7.58736 11.3144 7.5543 11.3607C7.51048 11.3997 7.45354 11.4179 7.39687 11.4109H6.62808Z" fill="#00A8E1" />
                    <path d="M10.2361 6.36587C10.0571 6.37535 9.8815 6.31149 9.74526 6.18738C9.61874 6.0616 9.55075 5.88311 9.55889 5.69932C9.54996 5.51441 9.61795 5.3348 9.74526 5.20847C10.033 4.96388 10.4419 4.96388 10.7296 5.20847C10.8562 5.33425 10.9241 5.51274 10.916 5.69653C10.9241 5.88032 10.8562 6.05881 10.7296 6.18459C10.5931 6.31037 10.4165 6.37535 10.2361 6.36587ZM9.85026 11.4138C9.75629 11.4325 9.66572 11.3667 9.64814 11.2666C9.6442 11.2443 9.6442 11.2214 9.64814 11.1991V7.26111C9.64157 7.20087 9.65864 7.14035 9.69539 7.09378C9.73896 7.05864 9.79304 7.0419 9.84764 7.04637H10.622C10.6782 7.04023 10.7346 7.05696 10.7795 7.09378C10.8142 7.14147 10.8299 7.20143 10.8241 7.26111V11.1991C10.8286 11.2571 10.8128 11.3145 10.7795 11.3608C10.7357 11.3999 10.6787 11.418 10.622 11.411L9.85026 11.4138Z" fill="#00A8E1" />
                    <path d="M12.0227 11.4107C11.9287 11.4293 11.8382 11.3635 11.8206 11.2634C11.8167 11.2411 11.8167 11.2182 11.8206 11.1959V7.26073C11.8141 7.20049 11.8311 7.13997 11.8679 7.0934C11.9114 7.05826 11.9655 7.04152 12.0201 7.04598H12.5999C12.7101 7.03427 12.8093 7.11654 12.8256 7.23284L12.8912 7.46432C13.1299 7.28946 13.3881 7.14722 13.66 7.04041C13.8843 6.9573 14.1202 6.91407 14.3579 6.91212C14.7714 6.87447 15.1687 7.09117 15.3812 7.4699C15.6207 7.29476 15.881 7.15419 16.1552 7.05156C16.3971 6.96594 16.6506 6.92271 16.9056 6.92327C17.2278 6.90263 17.5438 7.02367 17.7794 7.25794C17.9966 7.51118 18.1084 7.84724 18.089 8.18944V11.1987C18.0932 11.2567 18.0774 11.3142 18.0444 11.3605C18.0006 11.3995 17.9436 11.4176 17.887 11.4107H17.1234C17.0295 11.4293 16.939 11.3635 16.9214 11.2634C16.9174 11.2411 16.9174 11.2182 16.9214 11.1959V8.4516C16.9214 8.06311 16.7579 7.86872 16.4307 7.86872C16.1258 7.87234 15.8254 7.94876 15.5517 8.09183V11.1987C15.5562 11.2567 15.5405 11.3142 15.5071 11.3605C15.4633 11.3995 15.4064 11.4176 15.3497 11.4107H14.5783C14.4844 11.4293 14.3938 11.3635 14.3763 11.2634C14.3723 11.2411 14.3723 11.2182 14.3763 11.1959V8.4516C14.3763 8.06311 14.2128 7.86872 13.8856 7.86872C13.577 7.87067 13.2732 7.95015 12.9987 8.1002V11.1959C13.0029 11.2539 12.9872 11.3114 12.9541 11.3577C12.9103 11.3967 12.8534 11.4148 12.7967 11.4079L12.0227 11.4107Z" fill="#00A8E1" />
                    <path d="M20.8965 11.5396C20.3311 11.5789 19.7756 11.3681 19.3616 10.9567C18.983 10.496 18.7938 9.89331 18.8368 9.28337C18.799 8.65112 18.9906 8.02724 19.3721 7.5403C19.7696 7.10411 20.3261 6.87291 20.8965 6.90721C21.3185 6.88044 21.7351 7.01737 22.0694 7.29208C22.3522 7.54866 22.5081 7.92935 22.4918 8.32398C22.511 8.71025 22.3376 9.07895 22.0353 9.29453C21.6283 9.54163 21.1621 9.65597 20.6945 9.62362C20.4295 9.62697 20.165 9.59517 19.9074 9.5288C19.9089 9.83725 20.0259 10.1323 20.2327 10.3487C20.4775 10.5334 20.7756 10.6212 21.075 10.597C21.2214 10.597 21.3678 10.5866 21.5131 10.5663C21.7131 10.5334 21.9109 10.4885 22.1061 10.4324H22.1534H22.1927C22.2838 10.4324 22.3292 10.4985 22.3292 10.6304V11.0237C22.3341 11.0903 22.3215 11.157 22.2924 11.2161C22.2552 11.2627 22.2058 11.2964 22.1507 11.3137C21.7493 11.4707 21.3242 11.5474 20.8965 11.5396ZM20.6342 8.85388C20.8407 8.86978 21.0471 8.82348 21.2298 8.72001C21.3552 8.62881 21.426 8.47403 21.4161 8.31283C21.4161 7.95389 21.2148 7.77457 20.8126 7.77457C20.2965 7.77457 19.9984 8.11119 19.9178 8.78416C20.1522 8.83185 20.3904 8.85527 20.6289 8.85388H20.6342Z" fill="#00A8E1" />
                    <path d="M20.4741 16.2166C18.1756 18.0182 14.8434 18.9748 11.9755 18.9748C8.14313 18.9966 4.44089 17.4981 1.59298 14.7719C1.37782 14.5655 1.56936 14.2839 1.82912 14.4428C4.99295 16.363 8.5737 17.3715 12.2169 17.3684C14.9355 17.3531 17.6246 16.7682 20.1304 15.6477C20.5292 15.4719 20.8546 15.907 20.4741 16.2166Z" fill="#00A8E1" />
                    <path d="M21.4423 15.0699C21.1484 14.6711 19.5006 14.8803 18.7581 14.9751C18.5324 15.003 18.4957 14.7966 18.7004 14.646C20.0123 13.6643 22.1717 13.9488 22.421 14.2779C22.6702 14.607 22.3554 16.9023 21.109 17.9983C20.9201 18.1657 20.7391 18.0764 20.823 17.8533C21.1038 17.1031 21.7256 15.4576 21.4423 15.0699Z" fill="#00A8E1" />
                </svg>
            ),
            iconBg: "bg-blue-50",
            statusBadge: "bg-orange-100 text-orange-700 hover:bg-orange-100",
        },
    ];

    return (
        <Card className="p-4 w-full max-w-lg mx-auto h-full bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded-full">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3 18H0.9C0.661305 18 0.432387 17.9052 0.263604 17.7364C0.0948211 17.5676 0 17.3387 0 17.1V0.9C0 0.661305 0.0948211 0.432387 0.263604 0.263604C0.432387 0.0948211 0.661305 0 0.9 0H15.3C15.5387 0 15.7676 0.0948211 15.9364 0.263604C16.1052 0.432387 16.2 0.661305 16.2 0.9V17.1C16.2 17.3387 16.1052 17.5676 15.9364 17.7364C15.7676 17.9052 15.5387 18 15.3 18ZM14.4 16.2V1.8H1.8V16.2H14.4ZM4.5 4.5H11.7V6.3H4.5V4.5ZM4.5 8.1H11.7V9.9H4.5V8.1ZM4.5 11.7H11.7V13.5H4.5V11.7Z" fill="#525866" />
                        </svg>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">My Subscriptions</h2>
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer text-xs font-medium h-8 border-gray-200 text-gray-800 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 shadow-sm dark:border-gray-700 dark:text-gray-300 dark:hover:text-white">
                    See All
                </Button>
            </div>
            <div className="relative overflow-hidden border border-gray-200 dark:border-neutral-700 rounded-2xl">
                <div className="absolute top-0 right-0">
                    <svg width="78" height="84" viewBox="0 0 78 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M57.1701 -26.3831L100.26 -34.9471C102.223 -35.3373 104.053 -33.8351 104.053 -31.8332V34.1883C104.053 39.8087 100.123 44.6634 94.6256 45.8331L90.8188 46.643C84.1872 48.054 77.9408 42.9968 77.9408 36.2168C77.9408 31.4408 81.16 27.2648 85.7788 26.0494L96.5679 23.2101C98.0324 22.8247 99.0531 21.5007 99.0531 19.9864V-10.6665C99.0531 -12.0757 97.7583 -13.1291 96.3785 -12.8423L60.4712 -5.37925C59.3665 -5.14965 58.5747 -4.17627 58.5747 -3.04799V42.727C58.5747 48.8749 54.2732 54.1846 48.2591 55.4603L45.6486 56.014C38.8157 57.4634 32.3827 52.2519 32.3827 45.2669C32.3827 40.8153 35.3788 36.9213 39.6817 35.7804L50.9752 32.7859C52.3671 32.4168 53.3363 31.1572 53.3363 29.7172V-21.7123C53.3363 -23.9845 54.9415 -25.9402 57.1701 -26.3831Z" fill="url(#paint0_radial_92_159)" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M143.5 12C143.5 51.6264 111.376 83.75 71.75 83.75C32.1236 83.75 0 51.6264 0 12C0 -27.6264 32.1236 -59.75 71.75 -59.75C111.376 -59.75 143.5 -27.6264 143.5 12ZM137.15 12.0794C137.15 48.2429 107.87 77.5592 71.75 77.5592C35.6303 77.5592 6.34956 48.2429 6.34956 12.0794C6.34956 -24.0841 35.6303 -53.4004 71.75 -53.4004C107.87 -53.4004 137.15 -24.0841 137.15 12.0794Z" fill="url(#paint1_radial_92_159)" />
                        <defs>
                            <radialGradient id="paint0_radial_92_159" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.3827 72.1621) rotate(-55.1325) scale(143.556 112.733)">
                                <stop stop-color="#7A66FB" />
                                <stop offset="0.440198" stop-color="#52A2F4" />
                                <stop offset="0.702" stop-color="#FC5D6D" />
                                <stop offset="1" stop-color="#E85E7B" />
                            </radialGradient>
                            <radialGradient id="paint1_radial_92_159" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.3827 72.1621) rotate(-55.1325) scale(143.556 112.733)">
                                <stop stop-color="#7A66FB" />
                                <stop offset="0.440198" stop-color="#52A2F4" />
                                <stop offset="0.702" stop-color="#FC5D6D" />
                                <stop offset="1" stop-color="#E85E7B" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
                <div className="z-10 p-3">
                    <div className="flex items-start justify-between">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1551 6.51062L19.5629 4.8396C19.946 4.76345 20.3031 5.05657 20.3031 5.44718V18.3294C20.3031 19.4261 19.5362 20.3734 18.4635 20.6016L17.7207 20.7596C16.4268 21.0349 15.208 20.0482 15.208 18.7252C15.208 17.7933 15.8361 16.9785 16.7373 16.7413L18.8425 16.1873C19.1283 16.1121 19.3274 15.8538 19.3274 15.5583V9.57727C19.3274 9.3023 19.0748 9.09676 18.8056 9.15272L11.7993 10.6089C11.5837 10.6537 11.4292 10.8437 11.4292 11.0638V19.9955C11.4292 21.1951 10.5899 22.2311 9.4164 22.4801L8.90705 22.5881C7.57379 22.8709 6.31858 21.854 6.31858 20.4911C6.31858 19.6225 6.90319 18.8627 7.74278 18.6401L9.94638 18.0558C10.218 17.9838 10.4071 17.738 10.4071 17.457V7.42199C10.4071 6.97864 10.7203 6.59704 11.1551 6.51062Z" fill="url(#paint0_radial_92_156)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM26.7611 14.0155C26.7611 21.0718 21.0477 26.792 14 26.792C6.95226 26.792 1.23894 21.0718 1.23894 14.0155C1.23894 6.95919 6.95226 1.23894 14 1.23894C21.0477 1.23894 26.7611 6.95919 26.7611 14.0155Z" fill="url(#paint1_radial_92_156)" />
                                <defs>
                                    <radialGradient id="paint0_radial_92_156" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.31858 25.7389) rotate(-55.1325) scale(28.0109 21.9967)">
                                        <stop stop-color="#7A66FB" />
                                        <stop offset="0.440198" stop-color="#52A2F4" />
                                        <stop offset="0.702" stop-color="#FC5D6D" />
                                        <stop offset="1" stop-color="#E85E7B" />
                                    </radialGradient>
                                    <radialGradient id="paint1_radial_92_156" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.31858 25.7389) rotate(-55.1325) scale(28.0109 21.9967)">
                                        <stop stop-color="#7A66FB" />
                                        <stop offset="0.440198" stop-color="#52A2F4" />
                                        <stop offset="0.702" stop-color="#FC5D6D" />
                                        <stop offset="1" stop-color="#E85E7B" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <p className="font-bold text-black dark:text-white text-sm mb-1">50% discount on Apple Music</p>
                    <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                        For only $4.99 per month!
                        <span className="pl-1 text-black dark:text-white font-medium underline cursor-pointer mt-0.5">Learn More</span>
                    </p>
                </div>
            </div>
            <div className="space-y-4">
                {
                    subscriptions.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${sub.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    {sub.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-none mb-1">{sub.name}</p>
                                    <p className="text-xs text-black dark:text-white font-medium">
                                        ${sub.amount} <span className="text-gray-600 dark:text-gray-300">/{sub.period}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="secondary" className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border-none shadow-none ${sub.statusBadge}`}>
                                    {sub.status}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0 rounded-full hover:bg-gray-100 focus-visible:ring-0">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Change Plan
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Cancel
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Card>
    );
};

export default SubscriptionsSection;