"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    venueFormSchema,
    venueSpaceSchema,
    VenueFormValues,
    VenueSpaceFormValues,
} from "../venue.schema";
import {
    closeDrawer,
    prevDrawerStep,
    setDrawerStep,
    addVenue,
    updateVenue,
} from "../store/venue.slice";
import { IVenue } from "../venue.interface";
import { toast } from "sonner";
import {
    Building2,
    Check,
    ChevronRight,
    Plus,
    Trash2,
    X,
} from "lucide-react";

export const CreateVenue: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerMode, drawerStep, selectedVenue } = useSelector(
        (state: RootState) => state.venue
    );

    // Main Venue Form with React Hook Form + Zod validation
    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<VenueFormValues>({
        resolver: zodResolver(venueFormSchema),
        shouldUnregister: false,
        defaultValues: {
            name: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            capacity: undefined,
            parkingInfo: "",
            spaces: [],
        },
        mode: "onBlur",
    });

    // Watch spaces and form fields for reactive rendering
    const watchedSpaces = watch("spaces") || [];
    const watchedValues = watch();

    // Inline Space Form with React Hook Form + Zod validation
    const [isAddingSpace, setIsAddingSpace] = useState(false);
    const {
        register: spaceRegister,
        handleSubmit: handleSpaceSubmit,
        reset: resetSpaceForm,
        watch: spaceWatch,
        formState: { errors: spaceErrors },
    } = useForm<VenueSpaceFormValues>({
        resolver: zodResolver(venueSpaceSchema),
        defaultValues: {
            name: "",
            capacity: undefined,
        },
        mode: "onBlur",
    });

    // Initialize or reset form when drawer opens or selectedVenue changes
    useEffect(() => {
        if (drawerMode === "edit" && selectedVenue) {
            reset({
                name: selectedVenue.name,
                streetAddress: selectedVenue.streetAddress,
                city: selectedVenue.city,
                state: selectedVenue.state,
                zipCode: selectedVenue.zipCode,
                capacity:
                    typeof selectedVenue.capacity === "number"
                        ? selectedVenue.capacity
                        : selectedVenue.capacity
                            ? Number(selectedVenue.capacity)
                            : undefined,
                parkingInfo: selectedVenue.parkingInfo || "",
                spaces: (selectedVenue.spaces || []).map((s) => ({
                    id: s.id,
                    name: s.name,
                    capacity:
                        typeof s.capacity === "number"
                            ? s.capacity
                            : s.capacity
                                ? Number(s.capacity)
                                : 0,
                    description: s.description,
                })),
            });
        } else {
            reset({
                name: "",
                streetAddress: "",
                city: "",
                state: "",
                zipCode: "",
                capacity: undefined,
                parkingInfo: "",
                spaces: [],
            });
        }
    }, [drawerMode, selectedVenue, reset]);

    // Step 1 validation before advancing to Step 2
    const handleProceedToStep2 = async () => {
        const isStep1Valid = await trigger([
            "name",
            "streetAddress",
            "city",
            "state",
            "capacity",
        ]);

        if (!isStep1Valid) {
            toast.error("Please fill in all required fields correctly.");
            return;
        }

        dispatch(setDrawerStep(2));
    };

    // Step 2 to Step 3 (Parking) transition
    const handleProceedToStep3 = () => {
        // If user entered space info but forgot to hit Add, auto-add it
        const pendingName = spaceWatch("name");
        const pendingCap = spaceWatch("capacity");
        if (isAddingSpace && pendingName?.trim() && pendingCap) {
            const newSpace: VenueSpaceFormValues = {
                id: `space-${Date.now()}`,
                name: pendingName.trim(),
                capacity: Number(pendingCap),
            };
            setValue("spaces", [...watchedSpaces, newSpace], {
                shouldValidate: true,
                shouldDirty: true,
            });
            resetSpaceForm({ name: "", capacity: undefined });
            setIsAddingSpace(false);
        }

        dispatch(setDrawerStep(3));
    };

    // Add a space to the spaces array in the main form
    const onAddSpace: SubmitHandler<VenueSpaceFormValues> = (data) => {
        const newSpace: VenueSpaceFormValues = {
            id: `space-${Date.now()}`,
            name: data.name.trim(),
            capacity: Number(data.capacity),
        };

        setValue("spaces", [...watchedSpaces, newSpace], {
            shouldValidate: true,
            shouldDirty: true,
        });

        resetSpaceForm({
            name: "",
            capacity: undefined,
        });
        setIsAddingSpace(false);
        toast.success(`Space "${newSpace.name}" added`);
    };

    const handleRemoveSpace = (index: number) => {
        const updated = watchedSpaces.filter((_, i) => i !== index);
        setValue("spaces", updated, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    // Final Form Submission
    const onFormSubmit: SubmitHandler<VenueFormValues> = (data) => {
        const numericCapacity =
            data.capacity !== undefined && !Number.isNaN(Number(data.capacity))
                ? Number(data.capacity)
                : undefined;

        if (drawerMode === "edit" && selectedVenue) {
            const updated: IVenue = {
                ...selectedVenue,
                name: data.name.trim(),
                streetAddress: data.streetAddress.trim(),
                city: data.city.trim(),
                state: data.state.trim(),
                zipCode: data.zipCode?.trim() || "",
                capacity: numericCapacity,
                parkingInfo: data.parkingInfo?.trim() || "",
                hasParking: !!data.parkingInfo?.trim(),
                spaces: data.spaces || [],
                updatedAt: new Date().toISOString(),
            };

            dispatch(updateVenue(updated));
            toast.success("Venue updated successfully");
        } else {
            const newVenue: IVenue = {
                id: `venue-${Date.now()}`,
                name: data.name.trim(),
                streetAddress: data.streetAddress.trim(),
                city: data.city.trim(),
                state: data.state.trim(),
                zipCode: data.zipCode?.trim() || "",
                capacity: numericCapacity,
                parkingInfo: data.parkingInfo?.trim() || "",
                hasParking: !!data.parkingInfo?.trim(),
                spaces: data.spaces || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            dispatch(addVenue(newVenue));
            toast.success("Venue created successfully");
        }
    };

    return (
        <div className="flex flex-col h-full font-work-sans">
            {/* ========================================================================= */}
            {/* 1. Step Progress Wizard Bar */}
            {/* ========================================================================= */}
            <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50 shrink-0">
                <div className="flex items-center justify-between">
                    {/* Step 1 Tab */}
                    <button
                        type="button"
                        onClick={() => dispatch(setDrawerStep(1))}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div
                            className={`size-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${drawerStep === 1
                                ? "bg-[#C39B4C] text-white shadow-xs"
                                : drawerStep > 1
                                    ? "bg-[#16A34A] text-white"
                                    : "bg-neutral-200 text-neutral-600"
                                }`}
                        >
                            {drawerStep > 1 ? <Check className="size-3.5" /> : "1"}
                        </div>
                        <span
                            className={`text-xs font-medium ${drawerStep === 1
                                ? "text-neutral-900 font-semibold"
                                : "text-neutral-500"
                                }`}
                        >
                            Basic Info
                        </span>
                    </button>

                    <ChevronRight className="size-4 text-neutral-300" />

                    {/* Step 2 Tab */}
                    <button
                        type="button"
                        onClick={() => dispatch(setDrawerStep(2))}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div
                            className={`size-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${drawerStep === 2
                                ? "bg-[#C39B4C] text-white shadow-xs"
                                : drawerStep > 2
                                    ? "bg-[#16A34A] text-white"
                                    : "bg-neutral-200 text-neutral-600"
                                }`}
                        >
                            {drawerStep > 2 ? <Check className="size-3.5" /> : "2"}
                        </div>
                        <span
                            className={`text-xs font-medium ${drawerStep === 2
                                ? "text-neutral-900 font-semibold"
                                : "text-neutral-500"
                                }`}
                        >
                            Spaces
                        </span>
                    </button>

                    <ChevronRight className="size-4 text-neutral-300" />

                    {/* Step 3 Tab */}
                    <button
                        type="button"
                        onClick={handleProceedToStep3}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div
                            className={`size-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${drawerStep === 3
                                ? "bg-[#C39B4C] text-white shadow-xs"
                                : "bg-neutral-200 text-neutral-600"
                                }`}
                        >
                            3
                        </div>
                        <span
                            className={`text-xs font-medium ${drawerStep === 3
                                ? "text-neutral-900 font-semibold"
                                : "text-neutral-500"
                                }`}
                        >
                            Parking & Review
                        </span>
                    </button>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. Step Form Body (Kept mounted with CSS display to preserve values) */}
            {/* ========================================================================= */}
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                noValidate
                className="flex flex-col flex-1 overflow-hidden"
            >
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* STEP 1: Basic Information */}
                    <div className={drawerStep === 1 ? "space-y-4" : "hidden"}>
                        {/* Venue Name */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                                Venue Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. The Grand Ballroom"
                                {...register("name")}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all bg-white ${errors.name
                                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-[11px] text-red-500 mt-1 font-medium">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Street Address */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter venue address"
                                {...register("streetAddress")}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all bg-white ${errors.streetAddress
                                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                    }`}
                            />
                            {errors.streetAddress && (
                                <p className="text-[11px] text-red-500 mt-1 font-medium">
                                    {errors.streetAddress.message}
                                </p>
                            )}
                        </div>

                        {/* City & State/Region */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. New York"
                                    {...register("city")}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all bg-white ${errors.city
                                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                        : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                        }`}
                                />
                                {errors.city && (
                                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                                    State / Region <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="NY"
                                    {...register("state")}
                                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all bg-white ${errors.state
                                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                        : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                        }`}
                                />
                                {errors.state && (
                                    <p className="text-[11px] text-red-500 mt-1 font-medium">
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Capacity (Number) */}
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1.5">
                                Capacity (Number) <span className="text-neutral-400 font-normal">(optional)</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                placeholder="e.g. 500"
                                {...register("capacity", { valueAsNumber: true })}
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all bg-white ${errors.capacity
                                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                    }`}
                            />
                            {errors.capacity && (
                                <p className="text-[11px] text-red-500 mt-1 font-medium">
                                    {errors.capacity.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* STEP 2: Available Spaces */}
                    <div className={drawerStep === 2 ? "space-y-5" : "hidden"}>
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-900">
                                Available Spaces
                            </h3>
                            <p className="text-xs text-neutral-500 mt-0.5">
                                Add the rooms or spaces available at this venue.
                            </p>
                        </div>

                        {/* Inline Space Addition Form matching media_1788945916733.png */}
                        {isAddingSpace ? (
                            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-neutral-800">
                                        New Space Details
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddingSpace(false);
                                            resetSpaceForm();
                                        }}
                                        className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter room or space name"
                                            autoFocus
                                            {...spaceRegister("name")}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleSpaceSubmit(onAddSpace)();
                                                }
                                            }}
                                            className={`w-full px-3.5 py-2 rounded-lg border bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none ${spaceErrors.name
                                                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                                                : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                                }`}
                                        />
                                        {spaceErrors.name && (
                                            <p className="text-[11px] text-red-500 mt-1 font-medium">
                                                {spaceErrors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                placeholder="Capacity (e.g. 250)"
                                                {...spaceRegister("capacity", {
                                                    valueAsNumber: true,
                                                })}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleSpaceSubmit(onAddSpace)();
                                                    }
                                                }}
                                                className={`w-full px-3.5 py-2 rounded-lg border bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none ${spaceErrors.capacity
                                                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                                                    : "border-neutral-200 focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C]"
                                                    }`}
                                            />
                                            {spaceErrors.capacity && (
                                                <p className="text-[11px] text-red-500 mt-1 font-medium">
                                                    {spaceErrors.capacity.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleSpaceSubmit(onAddSpace)}
                                            className="px-4 py-2 bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
                                        >
                                            Add
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAddingSpace(false);
                                                resetSpaceForm();
                                            }}
                                            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsAddingSpace(true)}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C39B4C] hover:text-[#B38A3B] transition-colors cursor-pointer py-1"
                            >
                                <Plus className="size-4" />
                                <span>Add Space</span>
                            </button>
                        )}

                        {/* List of Configured Spaces */}
                        <div className="space-y-2 pt-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                Spaces ({watchedSpaces.length})
                            </span>

                            {watchedSpaces.length > 0 ? (
                                <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/80 bg-white overflow-hidden shadow-2xs">
                                    {watchedSpaces.map((space, idx) => (
                                        <div
                                            key={space.id || idx}
                                            className="flex items-center justify-between p-3.5 hover:bg-neutral-50/60 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-amber-50 text-[#C39B4C] flex items-center justify-center shrink-0">
                                                    <Building2 className="size-4" />
                                                </div>
                                                <div>
                                                    <p className="text-xs sm:text-sm font-semibold text-neutral-900">
                                                        {space.name}
                                                    </p>
                                                    <p className="text-[11px] text-neutral-400">
                                                        {space.capacity
                                                            ? `Capacity: ${space.capacity} guests (number)`
                                                            : "Capacity unassigned"}
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSpace(idx)}
                                                className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                                                title="Remove space"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-6 rounded-xl border border-dashed border-neutral-200 text-center bg-neutral-50/50">
                                    <p className="text-xs text-neutral-400">
                                        No spaces added yet. Click &ldquo;+ Add Space&rdquo; to add rooms, halls, or terraces.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STEP 3: Parking & Review */}
                    <div className={drawerStep === 3 ? "space-y-5" : "hidden"}>
                        <div>
                            <label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">
                                Parking Information
                            </label>
                            <p className="text-xs text-neutral-500 mb-2">
                                Provide parking instructions, nearby decks, or valet services.
                            </p>
                            <textarea
                                rows={4}
                                placeholder="Add parking instructions, entrance information, valet details, etc."
                                {...register("parkingInfo")}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#C39B4C]/20 focus:border-[#C39B4C] transition-all bg-white"
                            />
                        </div>

                        {/* Summary Review Card */}
                        <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                Venue Summary Preview
                            </h4>

                            <div className="space-y-2 text-xs text-neutral-700">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-neutral-900 w-24">
                                        Venue:
                                    </span>
                                    <span>{watchedValues.name || "Untitled Venue"}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-neutral-900 w-24">
                                        Address:
                                    </span>
                                    <span>
                                        {watchedValues.streetAddress
                                            ? `${watchedValues.streetAddress}, ${watchedValues.city || ""
                                            } ${watchedValues.state || ""}${watchedValues.zipCode ? ` ${watchedValues.zipCode}` : ""
                                            }`
                                            : "No address specified"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-neutral-900 w-24">
                                        Capacity:
                                    </span>
                                    <span>
                                        {watchedValues.capacity
                                            ? `${watchedValues.capacity} guests (number)`
                                            : "Not specified"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-neutral-900 w-24">
                                        Spaces:
                                    </span>
                                    <span>
                                        {watchedSpaces.length > 0
                                            ? `${watchedSpaces.length} space(s) configured`
                                            : "0 spaces"}
                                    </span>
                                </div>

                                {watchedSpaces.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1 pl-24">
                                        {watchedSpaces.map((s, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 rounded bg-white border border-neutral-200 text-[11px] text-neutral-600"
                                            >
                                                {s.name} ({s.capacity || 0})
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. Footer Navigation Buttons */}
                {/* ========================================================================= */}
                <div className="px-6 py-4 border-t border-neutral-100 bg-white flex items-center justify-between gap-3 shrink-0">
                    {drawerStep === 1 ? (
                        <button
                            type="button"
                            onClick={() => dispatch(closeDrawer())}
                            className="px-5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => dispatch(prevDrawerStep())}
                            className="px-5 py-2.5 rounded-lg border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            Back
                        </button>
                    )}

                    {drawerStep === 1 && (
                        <button
                            type="button"
                            onClick={handleProceedToStep2}
                            className="px-6 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                        >
                            Next: Spaces →
                        </button>
                    )}

                    {drawerStep === 2 && (
                        <button
                            type="button"
                            onClick={handleProceedToStep3}
                            className="px-6 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                        >
                            Next: Parking →
                        </button>
                    )}

                    {drawerStep === 3 && (
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-[#C39B4C] hover:bg-[#B38A3B] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                        >
                            {drawerMode === "edit" ? "Update Venue" : "Save Venue"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateVenue;