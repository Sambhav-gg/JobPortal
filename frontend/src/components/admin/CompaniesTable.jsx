import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";

import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies ,searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany , setFilterCompany]= useState(companies);
  const navigate= useNavigate();

  
  useEffect(()=>{
    const filteredCompany= companies.length >=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!companies || companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have not registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                    <AvatarImage
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                </TableCell>

                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={()=> navigate(`/admin/companies/${company._id}`)}>
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
